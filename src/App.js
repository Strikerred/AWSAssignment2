import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import LogIn from './components/auth/LogIn';
import { Auth } from 'aws-amplify';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordSubmit from './components/auth/ForgotPasswordSubmit';
import ChangePasswordConfirmation from './components/auth/ChangePasswordConfirmation';
import ChangePassword from './components/auth/ChangePassword';
import Players from './components/auth/players';
import Player from './components/auth/Player';

class App extends Component {
  state = {
    isAuth: sessionStorage.getItem("jwt-token"),
    user: null,
    checkingAuth: null,
    authProps: {}
  }

  authenticateUser = authenticated => {
    this.setState({isAuth: authenticated})
  }

  setAuthUser = user => {
    this.setState({user: user})
  }

  async componentDidMount(){
    try{
      const session = await Auth.currentSession();
      this.authenticateUser(true);
      //console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setAuthUser(user);

      sessionStorage.setItem("jwt-token", session.getAccessToken().getJwtToken());

    }catch(error){
      console.log(error);
    }

    this.setState({checkingAuth: false});
  }

  render() {
    const authProps = {
      isAuth:this.state.isAuth,
      user:this.state.user,
      authenticateUser:this.authenticateUser,
      setAuthUser:this.setAuthUser
    }

    return (
      !this.state.checkingAuth &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth = {authProps}/>
            <Switch>
              <Route exact path="/" render = {(props) => <Home {...props} auth = {authProps}/>}/>
              <Route exact path="/players" render = {(props) => <Players {...props} auth = {authProps}/>}/>
              <Route exact path="/register" render = {(props) => <Register {...props} auth = {authProps}/>}/>
              <Route exact path="/welcome" render = {(props) => <Welcome {...props} auth = {authProps}/>}/>
              <Route exact path="/login" render = {(props) => <LogIn {...props} auth = {authProps}/>}/>
              <Route exact path="/forgotpassword" render = {(props) => <ForgotPassword {...props} auth = {authProps}/>}/>
              <Route exact path="/forgotpasswordsubmit" render = {(props) => <ForgotPasswordSubmit {...props} auth = {authProps}/>}/>
              <Route exact path="/changepasswordconfirmation" render = {(props) => <ChangePasswordConfirmation {...props} auth = {authProps}/>}/>
              <Route exact path="/changepassword" render = {(props) => <ChangePassword {...props} auth = {authProps}/>}/>
              <Route path="/players/:id" render = {(props) => <Player {...props} auth = {authProps} />}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

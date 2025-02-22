import React, { Component } from 'react'
import { Auth } from "aws-amplify";

export default class Nazbar extends Component {
logOutHandler = async event =>{
  event.preventDefault();
  try{
    Auth.signOut();
    this.props.auth.authenticateUser(false);
    this.props.auth.setAuthUser(null);
    sessionStorage.clear();
  }catch(error){
    console.log(error.message);
  }
}

  render() {

    return (
      <nav className="navbar">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            {this.props.auth.isAuth && this.props.auth.user && (
                <a href="/players" className="navbar-item">
                  Players
                </a>
              )}
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuth && this.props.auth.user && (
                <p>Hello {this.props.auth.user.username}</p>
              )}
              <div className="auth-buttons">
                {!this.props.auth.isAuth && (
                <div>
                  <a href="/register" className="button is-primary">
                    <strong>Register</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>
                </div>                
                )}
                 {this.props.auth.isAuth && (
                    <div>
                      <a href="/changepassword" className="button is-warn">
                        Change Password      
                      </a>
                      <a href="/" onClick = {this.logOutHandler} className="button is-light">
                        Log out      
                      </a>
                    </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
import React from 'react';
import {Redirect} from 'react-router-dom';
import '../../Bootstrap.css';

const API_INVOKE_URL='https://c2ms03l2f1.execute-api.us-east-1.amazonaws.com/prod';

export default class Player extends React.Component {
  constructor() {
    super();
    this.state = { 
      player: {},
      loading: true,
    };
  }

  componentDidMount(){
    this.getPlayer();
  }

  async getPlayer (){
    await fetch(API_INVOKE_URL+'/players/' + this.props.match.params.id)
    .then(response => response.json())
    .then(data => {
        this.setState({player: data.body});
      });
  }

  render(){    
    return (
      <div className="row justify-content-center mt-5 pt-5">
         {this.props.auth.isAuth ? 
          <div className="card text-white bg-dark m-3 p-2 col-xs-12" key={this.state.player.Id}>
            <img className="card-img-top" src={this.state.player.photo} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title text-center">{this.state.player.currentTeam}</h5>
              <p className="card-text text-center">{this.state.player.firstName} {this.state.player.lastName}</p>
              <p className="card-text text-center">Age: {this.state.player.age}</p>   
              <p className="card-text text-center">Height: {this.state.player.height}</p> 
              <p className="card-text text-center">Position: {this.state.player.position}</p>                   
            </div>
          </div> 
          : <Redirect to="/" />
         }
      </div>
    )
  }  
} 
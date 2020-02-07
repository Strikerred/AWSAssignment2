import React from 'react';
import {Redirect} from 'react-router-dom';
import '../../Bootstrap.css'

const API_INVOKE_URL='https://c2ms03l2f1.execute-api.us-east-1.amazonaws.com/prod';

export default class Players extends React.Component {
  constructor() {
    super();
    this.state = { 
      players: [],
      loading: true,
    };
  }

  componentDidMount(){
    fetch(API_INVOKE_URL+'/players')
    .then(response => response.json())
    .then(data => {
        this.setState({players: JSON.parse(data.body), loading:false});
        console.log(data.body)
      });
  }

  render(){
    return (
      <div className="container">
        {this.props.auth.isAuth ? 
        <div className="row justify-content-center">                 
            {this.state.players.map(player =>            
              <div className="card text-white bg-dark m-3 p-2 col-xs-12 col-sm-8 col-md-5 col-lg-3" key={player.Id}>
                <img className="card-img-top" src={player.photo} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title text-center">{player.currentTeam}</h5>
                  <p className="card-text text-center">{player.firstName} {player.lastName}</p>              
                </div>
                <a href={`/players/${player.Id}`} className="card-text text-center text-white more-info">More info...</a>
              </div>            
          )}
          </div>
        : 
        <Redirect to="/" />
        }
      </div>
    )
  }  
} 
// App.js 
import React, { Component } from 'react';
import './App.css';
import DashBoard from "./user/DashBoard";
import LoginPage from "./user/LoginPage";
import RegistrationPage from "./user/RegistrationPage";
import {Route, Router, Switch} from "react-router-dom"; 
import { ACCESS_TOKEN, API_URL } from './constants/constants';
import {ajax} from "./utils/API";
import AppBar from "./shared/AppBar";
import history from "./history";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: true,
      isLoading: false
    };
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  };

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    ajax.get(API_URL + "users/user/me").then(response => {
      this.setState({
        currentUser: response.data,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      })
    })
  }
  
  componentDidMount() {
    this.loadCurrentUser();
    console.log(this.state.currentUser);
  }

  handleLogin() {
    this.loadCurrentUser();
    history.push("/dashboard");
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="App">
        <Router history={history}>
          <div>         
            <Switch>    
              <Route exact path="/" render={(props) => <AppBar/>}/>               
              <Route path="/login" render={(props) => <LoginPage onLogin={this.handleLogin}/>}/>
              <Route path="/register" render={(props) => <RegistrationPage onLogin={this.handleLogin}/>}/>                                
            </Switch>      
            <Route path="/dashboard" render={(props) => <DashBoard isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}/>}/>              
          </div>
        </Router>
      </div>
    );
  }
}
export default App;

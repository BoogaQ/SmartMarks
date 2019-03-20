// App.js 
import React, { Component } from 'react';
import './App.css';
import DashBoard from "./user/DashBoard";
import LoginPage from "./user/LoginPage";
import RegistrationPage from "./user/RegistrationPage";
import {Router, Switch, Route, Link} from "react-router-dom"; 
import { ACCESS_TOKEN, API_URL } from './constants/constants';
import {ajax} from "./utils/API";
import AppBar from "./shared/AppBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: true,
      isLoading: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  };

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    ajax.get(API_URL + "auth/user/me").then(response => {
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
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    this.props.history.push("/");
  }
  handleLogin() {
    this.loadCurrentUser();
    console.log(this.state);
    this.props.history.push("/");
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="App">
        <Switch>
          <Route path="/login" render={(props) => <LoginPage onLogin={this.handleLogin}/>}/>
          <Route path="/register" render={(props) => <RegistrationPage onLogin={this.handleLogin}/>}/>
          <Route path="/dashboard" render={(props) => <DashBoard/>}/>
          <Route path="/" render={(props) => <AppBar/>}/>
        </Switch>
      </div>
    );
  }
}
export default App;

// App.js 
import React, { Component } from 'react';
import logo from './logo.svg';
import AppBar from "./NavBar";
import './App.css';
import {getMuiTheme} from "@material-ui/core/styles";
import LoginForm from "./LoginForm";
import {Router, Switch, Route, Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Background from "./Images/login-background.jpg";
import withStyles from "@material-ui/core/styles/withStyles"; 

const styles = theme => ({
  background: {backgroundImage: `url(${Background})`}
});

class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component = {LoginForm}/>
          <Route path="/" component = {AppBar}/>
        </Switch>
      </div>
    );
  }
}
export default withStyles(styles)(App);

// App.js 
import React from 'react';
import './App.css';
import DashBoard from "./user/DashBoard";
import LoginPage from "./user/LoginPage";
import RegistrationPage from "./user/RegistrationPage";
import {Route, Router, Switch} from "react-router-dom"; 
import { API_URL } from './constants/constants';
import {ajax} from "./utils/API";
import AppBar from "./shared/AppBar";
import history from "./history";
import store from './store';
import {STORE_BOOKMARKS} from './constants';
import {storeBookmarks} from './actions';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: undefined,
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
        isAuthenticated: false,
        isLoading: false
      });
    }).catch(error => {
      console.log(error);
    })
  }
  
  componentDidMount() {
    this.loadCurrentUser();
    if (this.state.currentUser) {
      history.push("/dashboard");
    }
  }

  loadBookmarks() {
    ajax.get(API_URL + "users/user/bookmarks").then(response => {
      let payload = response.data;
      console.log(payload);
      store.dispatch(storeBookmarks(payload));
      console.log(store.getState());
    }).catch(error => {
      console.log(error);
    })
  }

  handleLogin() {
    this.loadCurrentUser();
    if (this.state.currentUser){
      this.loadBookmarks();
      history.push("/dashboard");
    } 
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>         
            <Switch>    
              <Route exact path="/" render={(props) => <AppBar/>}/>               
              <Route path="/login" render={(props) => <LoginPage onLogin={this.handleLogin}/>}/>
              <Route path="/register" render={(props) => <RegistrationPage onLogin={this.handleLogin}/>}/>                                
            </Switch>      
          <Route path="/dashboard" render={(props) => <DashBoard loadBookmarks = {this.loadBookmarks}/>}/>          
          </div>
        </Router>
      </div>
    );
  }
}
export default App;

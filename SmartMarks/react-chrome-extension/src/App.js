/*global chrome*/
import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
  }
  getPageDetails = () => {
    console.log("asd");
    chrome.tabs.getSelected(null, (tab) => {
      this.addBookmark(tab.title, tab.url);
    });
  }

  addBookmark = (title, url) => {
  chrome.cookies.get({url: "http://localhost:3000/dashboard", name: "accessToken"}, (cookie) => {
      console.log(cookie);
      let token;
      if (cookie != null) {
          token = cookie.value;
      }
      else {
          chrome.tabs.create({ url: "http://localhost:3000/login" });
          return;
      }
      
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

      if (token !== "null") {
          headers.append("Authorization", "Bearer " + token);
      } else {
          headers.append("Authorization", null);
      };

      fetch("http://localhost:8080/api/bookmarks/analyse", {
          method: "POST",
          headers: headers,
          body: url,
      }).then(response => {
          return response.json();
      }).then(data => {
          let tags = data;
          fetch("http://localhost:8080/api/bookmarks/add", {
              method: "POST",
              mode: "cors",
              headers: headers,
              body: JSON.stringify({name: title, url: url, tags: tags})
          }).then(response => {
              console.log(response);
          }).catch(error => {
              console.log(error);
          })
      }).catch(error => {
          console.log(error);
      })
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            SmartMarks
          </p>
          <button onClick={() => {this.getPageDetails()}} id="addmark">Add Bookmark!</button>
        </header>
      </div>
    );
  }
}


export default App;

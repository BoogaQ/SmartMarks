import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './components/views/home';
import Contact from './components/views/contact';

export default (
  <Route path='/' component={App}>
    <Route path = 'login' component={Home} />
    <Route path='contact' component={Contact} />
    <Route path='*' component={Home} />
  </Route>
);
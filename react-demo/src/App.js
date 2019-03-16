import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import PasswordManager from './components/PasswordManager';
import PasswordDetails from './components/PasswordDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={SignIn} />
          <Route path="/passwords" component={PasswordManager} />
          <Route path="/password/:id?" component={PasswordDetails} />
        </div>
      </Router>
    );
  }
}

export default App;

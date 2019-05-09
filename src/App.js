import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/home';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}

export default App;

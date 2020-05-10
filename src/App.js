import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import './App.css';
import LandingPage from './components/home/Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingPage {...this.props} />
      </div>
    );
  }
}

export default hot(App);

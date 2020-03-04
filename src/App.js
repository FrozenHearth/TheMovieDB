import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  componentDidMount() {
    this.props.history.push('/movies');
  }
  render() {
    return <div className="App"></div>;
  }
}

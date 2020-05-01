import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/home/Landing';
// import MovieList from './components/movies/MovieList/MoviesList';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <MovieList {...this.props} /> */}
        <LandingPage {...this.props} />
      </div>
    );
  }
}

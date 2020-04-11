import React, { Component } from 'react';
import './App.css';
import MovieList from './components/movies/movie-list/MovieList';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieList {...this.props} />
      </div>
    );
  }
}

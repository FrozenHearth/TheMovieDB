import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import MovieList from './components/movies/movie-list/MovieList';
import MovieDetails from './components/movies/movie-details/MovieDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const rootElement = document.getElementById('root');

render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/movies" component={MovieList} />
      <Route exact path="/movies/:id" component={MovieDetails} />
    </Switch>
  </Router>,
  rootElement
);

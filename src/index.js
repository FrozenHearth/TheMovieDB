import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import MovieDetails from './components/movies/movie-details/MovieDetails';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import People from './components/people/People';
import ScrollIntoView from './components/utils/ScrollIntoView';

const rootElement = document.getElementById('root');

render(
  <Router basename={process.env.PUBLIC_URL}>
    <ScrollIntoView>
      <Switch>
        <Route exact path={`/`} component={App} />
        <Route exact path={`/movie/:id`} component={MovieDetails} />
        <Route exact path={`/people/:id`} component={People} />
      </Switch>
    </ScrollIntoView>
  </Router>,
  rootElement
);

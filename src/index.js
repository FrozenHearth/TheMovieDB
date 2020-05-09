import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import PersonDetails from './components/people/Details/index';
import ScrollIntoView from './common/utils/ScrollIntoView';
import PopularMovies from './components/movies/Popular/PopularMovies';
import MovieDetails from './common/MovieDetails/MovieDetails';
import PersonsList from './components/people/List/index';
import NowPlaying from './components/movies/NowPlaying/NowPlaying';

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollIntoView>
        <Switch>
          <Route exact path={`/`} component={App} />
          <Route exact path={`/movie/:id`} component={MovieDetails} />
          <Route exact path={`/people/:id`} component={PersonDetails} />
          <Route exact path={`/people`} component={PersonsList} />
          <Route exact path={`/popular`} component={PopularMovies} />
          <Route exact path={`/now-playing`} component={NowPlaying} />
        </Switch>
      </ScrollIntoView>
    </Router>
    ,
  </Provider>,
  rootElement
);

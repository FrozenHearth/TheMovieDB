import { combineReducers } from 'redux';

import popularMovies from '../reducers/popularMovies/reducer';
import movieDetails from '../reducers/movieDetails/reducer';
import popularPeople from '../reducers/popularPeople/reducer';

export default combineReducers({
  popularMovies,
  movieDetails,
  popularPeople
});

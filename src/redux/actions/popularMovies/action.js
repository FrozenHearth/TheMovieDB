import {
  GET_POPULAR_MOVIES,
  GET_GENRES_FOR_POPULAR_MOVIES
} from './actionTypes';
import axios from 'axios';
import {
  popularMoviesURL,
  popularMoviesGenresURL
} from '../../../utils/apiURLs';

export const actionGetPopularMovies = () => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `${popularMoviesURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );

      dispatch({
        type: GET_POPULAR_MOVIES,
        payload: result
      });
      return result.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

export const actionGetGenresForPopularMovies = () => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `${popularMoviesGenresURL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      dispatch({
        type: GET_GENRES_FOR_POPULAR_MOVIES,
        payload: result
      });
      return result.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

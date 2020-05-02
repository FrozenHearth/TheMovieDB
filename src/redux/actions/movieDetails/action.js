import {
  GET_MOVIE_DETAILS,
  GET_MOVIE_CREDITS,
  GET_SIMILAR_MOVIES
} from './actionTypes';
import axios from 'axios';
import { movieURL } from '../../../utils/apiURLs';

export const actionGetMovieDetails = id => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `${movieURL}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      dispatch({
        type: GET_MOVIE_DETAILS,
        payload: result
      });
      return result.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

export const actionGetMovieCredits = id => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `${movieURL}${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      );
      dispatch({
        type: GET_MOVIE_CREDITS,
        payload: result
      });
      return result.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

export const actionGetSimilarMovies = id => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `${movieURL}${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      dispatch({
        type: GET_SIMILAR_MOVIES,
        payload: result
      });
      return result.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

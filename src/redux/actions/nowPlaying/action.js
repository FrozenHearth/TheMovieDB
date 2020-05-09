import axios from 'axios';
import { GET_NOW_PLAYING } from './actionTypes';
import { nowPlayingMoviesURL } from '../../../utils/apiURLs';

export const actionGetNowPlayingMovies = () => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `${nowPlayingMoviesURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );

      dispatch({
        type: GET_NOW_PLAYING,
        payload: result
      });
      return result.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

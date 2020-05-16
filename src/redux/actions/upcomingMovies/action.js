import axios from 'axios';
import { GET_UPCOMING_MOVIES } from './actionTypes';
import { upcomingMoviesURL } from '../../../utils/apiURLs';

export const actionGetUpcomingMovies = () => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `${upcomingMoviesURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );

      dispatch({
        type: GET_UPCOMING_MOVIES,
        payload: result
      });
      return result.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

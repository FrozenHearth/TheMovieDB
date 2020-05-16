import axios from 'axios';
import { GLOBAL_SEARCH } from './actionTypes';
import { movieSearchURL } from '../../../utils/apiURLs';

export const actionGlobalSearch = searchTerm => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `${movieSearchURL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&query=${searchTerm}`
      );

      dispatch({
        type: GLOBAL_SEARCH,
        payload: result
      });
      return result.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

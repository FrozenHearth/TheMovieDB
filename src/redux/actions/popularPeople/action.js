import { popularPeopleURL } from '../../../utils/apiURLs';
import axios from 'axios';

import { GET_POPULAR_PEOPLE } from './actionTypes';

export const actionGetPopularPeople = () => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `${popularPeopleURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );

      dispatch({
        type: GET_POPULAR_PEOPLE,
        payload: result
      });
      return result.data;
    } catch (err) {
      return console.log(err);
    }
  };
};

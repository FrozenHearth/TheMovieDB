import { GET_POPULAR_PEOPLE } from '../../actions/popularPeople/actionTypes';

const initState = {
  data: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_POPULAR_PEOPLE:
      const { results } = action.payload.data;
      state.data = results;
      return { ...state };
    default:
      return state;
  }
};

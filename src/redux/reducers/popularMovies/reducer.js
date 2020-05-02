import {
  GET_POPULAR_MOVIES,
  GET_GENRES_FOR_POPULAR_MOVIES
} from '../../actions/popularMovies/actionTypes';

const initState = {
  data: [],
  genres: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_POPULAR_MOVIES:
      const { results } = action.payload.data;
      state.data = results;
      return { ...state };
    case GET_GENRES_FOR_POPULAR_MOVIES:
      const { genres } = action.payload.data;
      state.genres = genres;
      return { ...state };
    default:
      return state;
  }
};

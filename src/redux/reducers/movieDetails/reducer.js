import {
  GET_MOVIE_DETAILS,
  GET_MOVIE_CREDITS,
  GET_SIMILAR_MOVIES
} from '../../actions/movieDetails/actionTypes';

const initState = {
  movieDetails: {},
  similarMovies: [],
  credits: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_MOVIE_DETAILS:
      const { results } = action.payload.data;
      state.movieDetails = results;
      return { ...state };
    case GET_MOVIE_CREDITS:
      const { credits } = action.payload.data;
      state.credits = credits;
      return { ...state };
    case GET_SIMILAR_MOVIES:
      const similarMovies = action.payload.data.results;
      state.similarMovies = similarMovies;
      return { ...state };
    default:
      return state;
  }
};

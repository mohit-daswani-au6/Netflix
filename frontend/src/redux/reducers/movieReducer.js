const {
  GET_ALL_MOVIES,
  SEARCH_MOVIES,
  SEARCH_MOVIES_BY_LANGUAGE,
  MOVIE_DETAIL,
  TRENDING_MOVIES,
  TOP_RATED_MOVIES,
  GET_MOVIES_BY_GENRE,
  NETFLIX_ORIGINALS,
  LATEST_MOVIES,
} = require("../actionTypes");

const initialState = {
  movies: null,
  error: null,
};
const MoviesReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case GET_ALL_MOVIES:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    case GET_MOVIES_BY_GENRE:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    case NETFLIX_ORIGINALS:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    case TRENDING_MOVIES:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    case TOP_RATED_MOVIES:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    case MOVIE_DETAIL:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    case SEARCH_MOVIES_BY_LANGUAGE:
      if (payload.error) {
        return { ...state, error: payload };
      } else return { ...state, admin: payload };
    case SEARCH_MOVIES:
      if (payload.error) {
        return { ...state, error: payload };
      } else return { ...state, admin: payload };
    case LATEST_MOVIES:
      if (payload.error) {
        return { ...state, error: payload };
      } else return { ...state, admin: payload };
    default:
      return state;
  }
};
export default MoviesReducer;

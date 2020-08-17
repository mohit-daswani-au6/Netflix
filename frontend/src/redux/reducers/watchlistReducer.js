const { ADD_TO_WATCHLIST, GET_WATCHLIST } = require("../actionTypes");

const initialState = {
  movies: null,
  error: null,
};
const WatchlistReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case GET_WATCHLIST:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    case ADD_TO_WATCHLIST:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    default:
      return state;
  }
};
export default WatchlistReducer;

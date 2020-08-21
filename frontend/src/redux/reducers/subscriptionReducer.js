const {
  GET_SUBSCRIBTION,
  RAZORPAY_SUCCESS,
} = require("../actionTypes");

const initialState = {
  movies: null,
  error: null,
};
const SubscriptionReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case GET_SUBSCRIBTION:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    case RAZORPAY_SUCCESS:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }

    default:
      return state;
  }
};
export default SubscriptionReducer;

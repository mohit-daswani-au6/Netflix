const { REGISTER_ADMIN, LOGIN_ADMIN, LOGOUT_ADMIN } = require("../actionTypes");

const initialState = {
  admin: null,
  error: null,
};
const ADMINReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case REGISTER_ADMIN:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, admin: payload };
      }
    case LOGIN_ADMIN:
      if (payload.error) {
        return { ...state, error: payload };
      } else return { ...state, admin: payload };
    case LOGOUT_ADMIN:
      return { ...state, admin: null };
    default:
      return state;
  }
};
export default ADMINReducer;

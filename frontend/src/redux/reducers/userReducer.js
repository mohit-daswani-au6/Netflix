const { REGISTER_USER, LOGIN_USER, LOGOUT_USER, FORGOT_PASSWORD,FORGOT_PASSWORD_LINK, CHANGE_PASSWORD } = require("../actionTypes");

const initialState = {
  user: null,
  error: null,
};
const userReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case REGISTER_USER:
      if (payload.error) {
        return { ...state, error: payload };
      } else {
        return { ...state, user: payload };
      }
    case LOGIN_USER:
      if (payload.error) {
        return { ...state, error: payload };
      } else return { ...state, user: payload };
    case FORGOT_PASSWORD_LINK:
      if (payload.error) {
        return { ...state, error: payload };
      } else return { ...state, user: payload };
      case CHANGE_PASSWORD:
        if (payload.error) {
          return { ...state, error: payload };
        } else return { ...state, user: payload };
      case FORGOT_PASSWORD:
        if (payload.error) {
          return { ...state, error: payload };
        } else return { ...state, user: payload };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
export default userReducer;

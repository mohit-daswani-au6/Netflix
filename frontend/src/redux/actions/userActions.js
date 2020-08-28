import Axios from "axios";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  EMAIL_VERIFICATION,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  CHANGE_PHONE_NUMBER,
  CHANGE_EMAIL,
  FACEBOOK_LOGIN,
} from "../actionTypes";

export const registerUser = (data1) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `https://powerful-temple-56540.herokuapp.com/user/register`,
      data1,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    // if (data.error) throw Error("error happened")
    dispatch({ type: REGISTER_USER, payload: data });
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const loginUser = (data1) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `https://powerful-temple-56540.herokuapp.com/user/login`,
      data1,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    dispatch({ type: LOGIN_USER, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    // console.log(err)
  }
};
export const logoutUser = () => async (dispatch, getState) => {
  try {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.user.token;
    const { data } = await Axios.delete(
      `https://powerful-temple-56540.herokuapp.com/user/logout`,
      {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    dispatch({ type: LOGOUT_USER, payload: data });
  } catch (err) {
    alert("invalid credentials");
    console.log(err);
  }
};
export const emailVerification = (token) => async (dispatch) => {
  try {
    console.log(token);
    const data = await Axios(
      `https://powerful-temple-56540.herokuapp.com/user/verify/$${token}`
    );
    dispatch({ type: EMAIL_VERIFICATION, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const forgotPasswordLink = (data1) => async (dispatch) => {
  try {
    console.log(data1);
    const { data } = await Axios.post(
      `https://powerful-temple-56540.herokuapp.com/user/forgot_password`,
      data1,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    dispatch({ type: FORGOT_PASSWORD, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    // console.log(err)
  }
};
export const ChangeforgotPassword = (data1, token) => async (
  dispatch,
  getState
) => {
  try {
    console.log(data1, token);
    const { data } = await Axios.put(
      `https://powerful-temple-56540.herokuapp.com/user/forgot_password/${token}`,
      data1,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    dispatch({ type: FORGOT_PASSWORD, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    // console.log(err)
  }
};
export const ChangePassword = (data1) => async (dispatch, getState) => {
  try {
    const userJSON = localStorage.getItem("user");

    const user = JSON.parse(userJSON);
    const token = user.user.token;
    const { data } = await Axios.put(
      `https://powerful-temple-56540.herokuapp.com/user/changePassword`,
      data1,
      {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    console.log(data);
    dispatch({ type: CHANGE_PASSWORD, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    // console.log(err)
  }
};
export const changePhoneNo = (data1) => async (dispatch, getState) => {
  try {
    const userJSON = localStorage.getItem("user");

    const user = JSON.parse(userJSON);
    const token = user.user.token;

    const { data } = await Axios.put(
      `https://powerful-temple-56540.herokuapp.com/user/changePhoneNumber`,
      data1,
      {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    dispatch({ type: CHANGE_PHONE_NUMBER, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    // console.log(err)
  }
};
export const changeEmail = (data1) => async (dispatch, getState) => {
  try {
    const userJSON = localStorage.getItem("user");

    const user = JSON.parse(userJSON);
    const token = user.user.token;
    const { data } = await Axios.put(
      `https://powerful-temple-56540.herokuapp.com/user/changeEmail`,
      data1,
      {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    dispatch({ type: CHANGE_EMAIL, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    // console.log(err)
  }
};
export const facebookLogin = () => async (dispatch) => {
  try {

    const { data } = await Axios(`http://localhost:5555/facebook`, {
      headers: {
        Accept:"application/json",
        'Access-Control-Allow-Origin':"*",
        'Access-Control-Allow-Credentials':true,
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, Authorization"
      }
    });
    console.log(data);
    dispatch({ type: FACEBOOK_LOGIN, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    console.log(err);
  }
};

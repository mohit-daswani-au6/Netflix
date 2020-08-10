import Axios from "axios";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  EMAIL_VERIFICATION,
  FORGOT_PASSWORD,
} from "../actionTypes";

export const registerUser = (data1) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `http://localhost:5555/user/register`,
      data1,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    // if (data.error) throw Error("error happened")
    console.log(data);
    dispatch({ type: REGISTER_USER, payload: data });
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const loginUser = (data1) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `http://localhost:5555/user/login`,
      data1,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(typeof data, data);
    dispatch({ type: LOGIN_USER, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    // console.log(err)
  }
};
export const logoutUser = () => async (dispatch, getState) => {
  try {    
    const token = getState().userState.user.token;
    const { data } = await Axios.delete(`http://localhost:5555/user/logout`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    console.log(data);
    dispatch({ type: LOGOUT_USER, payload: data });
  } catch (err) {
    alert("invalid credentials");
    console.log(err);
  }
};
export const emailVerification = (token) => async (dispatch) => {
  try {
    console.log(token);
    const data = await Axios(`http://localhost:5555/user/verify/$${token}`);
    console.log(data);
    dispatch({ type: EMAIL_VERIFICATION, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const forgotPasswordLink = (data1) => async (dispatch) => {
  try {
    console.log(data1);
    const { data } = await Axios.post(
      `http://localhost:5555/user/forgot_password`,
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
export const ChangeforgotPassword = (data1,token) => async (dispatch,getState) => {
  try {
    console.log(data1,token);
    const { data } = await Axios.put(
      `http://localhost:5555/user/forgot_password/${token}`,
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

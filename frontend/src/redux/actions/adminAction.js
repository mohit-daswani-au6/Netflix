import Axios from "axios";
import {
  REGISTER_ADMIN,
  LOGIN_ADMIN,
  LOGOUT_ADMIN,
  Add_MOVIE
} from "../actionTypes";
export const addMovie = (data1) => async (dispatch) => {
  try {
      console.log(data1)
    const { data } = await Axios.post(
      `http://localhost:5555/admin/addMovie`,
      data1,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(typeof(data),data);
    dispatch({ type: Add_MOVIE, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    // console.log(err)
  }
};
export const logoutAdmin = () => async (dispatch,getState) => {
  try {
    const token= getState().adminState.admin.token
    const { data } = await Axios.delete(`http://localhost:5555/admin/logout`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    console.log(data);
    dispatch({ type: LOGOUT_ADMIN, payload: data });
  } catch (err) {
    alert("invalid credentials");
    console.log(err);
  }
};
export const loginAdmin = (data1) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `http://localhost:5555/admin/login`,
      data1,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(typeof data, data);
    dispatch({ type: LOGIN_ADMIN, payload: data });
    return data;
  } catch (err) {
    alert("invalid credentials");
    // console.log(err)
  }
};


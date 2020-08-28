import Axios from "axios";
import {
  LOGIN_ADMIN,
  LOGOUT_ADMIN,
  Add_MOVIE
} from "../actionTypes";
export const addMovie = (data1) => async (dispatch) => {
  try {
      console.log(data1)
    const { data } = await Axios.post(
      `https://powerful-temple-56540.herokuapp.com/admin/addMovie`,
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
    alert("Error occured");
    // console.log(err)
  }
};
export const logoutAdmin = () => async (dispatch,getState) => {
  try {
    const token = localStorage.getItem("admin");
    const { data } = await Axios.delete(`https://powerful-temple-56540.herokuapp.com/admin/logout`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    dispatch({ type: LOGOUT_ADMIN, payload: data });
  } catch (err) {
    alert("invalid credentials");
    console.log(err);
  }
};
export const loginAdmin = (data1) => async (dispatch) => {
  try {
    const { data } = await Axios.post(
      `https://powerful-temple-56540.herokuapp.com/admin/login`,
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


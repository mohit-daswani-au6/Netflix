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
// export const logoutUser = () => async (dispatch,getState) => {
//   try {
//     const token= getState().userState.user.token
//     const { data } = await Axios.delete(`http://localhost:5555/user/logout`, {
//       headers: {
//         Accept: "application/json",
//         Authorization: token,
//       },
//     });
//     console.log(data);
//     dispatch({ type: LOGOUT_USER, payload: data });
//   } catch (err) {
//     alert("invalid credentials");
//     console.log(err);
//   }
// };
// export const emailVerification = (token) => async (dispatch) => {
//   try {
//     console.log(token);
//     const data = await Axios(`http://localhost:5555/user/verify/$${token}`);
//     console.log(data);
//     dispatch({ type: EMAIL_VERIFICATION, payload: data });
//   } catch (err) {
//     console.log(err);
//   }
// };

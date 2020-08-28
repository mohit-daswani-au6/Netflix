import Axios from "axios";
import { GET_WATCHLIST, ADD_TO_WATCHLIST } from "../actionTypes";
export const getWatchlist = () => async (dispatch, getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios(`https://powerful-temple-56540.herokuapp.com/user/watchlist`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    dispatch({ type: GET_WATCHLIST, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};
export const addToWatchlist = (movieId) => async (dispatch, getState) => {
  try {

    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios(
      `https://powerful-temple-56540.herokuapp.com/watchlist/${movieId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    dispatch({ type: ADD_TO_WATCHLIST, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};

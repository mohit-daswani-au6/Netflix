import Axios from "axios";
import {
  GET_ALL_MOVIES, MOVIE_DETAIL, TRENDING_MOVIES, TOP_RATED_MOVIES
} from "../actionTypes";
export const getAllMovies = () => async (dispatch,getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const { data } = await Axios(
      `http://localhost:5555/allMovies`,
      {
        headers: {
          Accept: "application/json",
        //   Authorization:token
        },
      }
    );
    console.log(data);
    dispatch({ type: GET_ALL_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err)
  }
};
export const trendingMovies = () => async (dispatch,getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const { data } = await Axios(
      `http://localhost:5555/movies/TrendingMovies`,
      {
        headers: {
          Accept: "application/json",
        //   Authorization:token
        },
      }
    );
    console.log(data);
    dispatch({ type: TRENDING_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err)
  }
};
export const topRatedMovies = () => async (dispatch,getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const { data } = await Axios(
      `http://localhost:5555/movies/topRated`,
      {
        headers: {
          Accept: "application/json",
        //   Authorization:token
        },
      }
    );
    console.log(data);
    dispatch({ type: TOP_RATED_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err)
  }
};
export const fetchNetflixOriginals = () => async (dispatch,getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const { data } = await Axios(
      `http://localhost:5555/movies/netflixOriginals`,
      {
        headers: {
          Accept: "application/json",
        //   Authorization:token
        },
      }
    );
    console.log(data);
    dispatch({ type: TOP_RATED_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err)
  }
};
export const getMoviesByGenre = (genre) => async (dispatch,getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    console.log(genre)
    const { data } = await Axios(
      `http://localhost:5555/movies/${genre}`,
      {
        headers: {
          Accept: "application/json",
        //   Authorization:token
        },
      }
    );
    console.log(data);
    dispatch({ type: TOP_RATED_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err)
  }
};
export const getMovieDetail = (MovieId) => async (dispatch,getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const { data } = await Axios(
      `http://localhost:5555/movies/${MovieId}`,
      {
        headers: {
          Accept: "application/json",
        //   Authorization:token
        },
      }
    );
    console.log(data);
    dispatch({ type: MOVIE_DETAIL, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err)
  }
};


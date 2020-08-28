import Axios from "axios";
import {
  GET_ALL_MOVIES,
  MOVIE_DETAIL,
  TRENDING_MOVIES,
  TOP_RATED_MOVIES,
  SEARCH_MOVIES,
  SEARCH_MOVIES_BY_LANGUAGE
} from "../actionTypes";
export const getAllMovies = () => async (dispatch, getState) => {
  try {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios(`https://powerful-temple-56540.herokuapp.com/allMovies`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    dispatch({ type: GET_ALL_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};
export const trendingMovies = () => async (dispatch, getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios(
      `https://powerful-temple-56540.herokuapp.com/movies/TrendingMovies`,
      {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    dispatch({ type: TRENDING_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};
export const topRatedMovies = (page = 0, genre) => async (
  dispatch,
  getState
) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios(`https://powerful-temple-56540.herokuapp.com/movies/topRated`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    dispatch({ type: TOP_RATED_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};
export const fetchNetflixOriginals = () => async (dispatch, getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios(
      `https://powerful-temple-56540.herokuapp.com/movies/netflixOriginals`,
      {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    dispatch({ type: TOP_RATED_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};
export const getMoviesByGenre = (genre) => async (dispatch, getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios(`https://powerful-temple-56540.herokuapp.com/movies/${genre}`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    dispatch({ type: TOP_RATED_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};
export const getMoviesByLanguage = (language="hindi") => async (dispatch, getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios(`https://powerful-temple-56540.herokuapp.com/movies/language/${language}`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    dispatch({ type: SEARCH_MOVIES_BY_LANGUAGE, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};
export const getMovieDetail = (MovieId) => async (dispatch, getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios(`https://powerful-temple-56540.herokuapp.com/movie/${MovieId}`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    dispatch({ type: MOVIE_DETAIL, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};
export const searchMovies = (name) => async (dispatch, getState) => {
  try {
    // const token = getState().userState.user.token;
    // console.log(token)
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios.get(`https://powerful-temple-56540.herokuapp.com/search?value=${name}`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    dispatch({ type: SEARCH_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};
export const latestMovies = () => async (dispatch, getState) => {
  try {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const token = user.token;
    const { data } = await Axios.get(`https://powerful-temple-56540.herokuapp.com/latest`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });
    dispatch({ type: SEARCH_MOVIES, payload: data });
    return data;
  } catch (err) {
    // alert("invalid credentials");
    console.log(err);
  }
};


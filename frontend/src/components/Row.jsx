import React, { useState, useEffect } from "react";
import "../styles/Row.css";
import { Link, withRouter } from "react-router-dom";
import { addToWatchlist } from "../redux/actions/watchlistAction";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import Banner from "./Banner";
import MovieDetailPopup from "./MovieDetailPopup";
const Row = ({
  title,
  moviesURL,
  isLargeRow,
  genre,
  addToWatchlist,
  list,
  styling,
  history,
}) => {
  const [Movies, setmovies] = useState([]);
  const [MovieDetail, setmovieDetail] = useState([]);
  const [Success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await moviesURL(genre);
      if (response.statusCode === 201) {
        setmovies(response.movies);
      }
    };
    fetchMovies();
  }, []);
  const handlePopup = async (e) => {
    e.preventDefault();
    const movie=[]
    movie.push(JSON.parse(e.target.value));
    // console.log(e.target.value)
    setmovieDetail(movie)
  };
  // console.log(MovieDetail)
  const handleRemoveWatchlist = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const response = await addToWatchlist(e.target.value);
    if (response.statusCode === 201) {
      setSuccess(true);
      window.location.reload(false);
    }
  };
  const handleAddWatchlist = async (e) => {
    e.preventDefault();
    const response = await addToWatchlist(e.target.value);
    console.log(response);
  };
  return (
    <div className="row1" style={{ styling }}>
      <h2 style={{ marginLeft: "20px" }}>{title}</h2>
      <br />
      <div className="row_posters">
        {Movies
          ? Movies.map((movie) => (
              <div key={movie._id} className="container">
                <Link to={`movies/${movie._id} `}>
                  <img
                    src={`https://${
                      isLargeRow ? movie.posterImage : movie.backgroundImage
                    }`}
                    className={`row_poster ${isLargeRow && "row_posterLarge"} `}
                    alt={movie.MovieName}
                  />
                </Link>
                {/* <button
                  className="popup"
                  value={JSON.stringify(movie)}
                  onClick={handlePopup}
                /> */}
                {list ? (
                  <button
                    className={`removeMylist ${
                      Movies.length <= 3 && "shortrow"
                    }`}
                    value={movie._id}
                    title="Remove from my list"
                    onClick={handleRemoveWatchlist}
                  />
                ) : (
                  <button
                    className="addToWatchlist"
                    value={movie._id}
                    title="Add to my list"
                    onClick={handleAddWatchlist}
                  />
                )}
              </div>
            ))
          : null}
      </div>
      {/* {console.log(MovieDetail)}
      <MovieDetailPopup movie={MovieDetail} /> */}
    </div>
  );
};

export default connect(null, { addToWatchlist })(withRouter(Row));

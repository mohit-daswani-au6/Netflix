import React, { useState, useEffect } from "react";
import "../styles/Row.css";
import { Link, withRouter } from "react-router-dom";
import { addToWatchlist } from "../redux/actions/watchlistAction";
import { connect } from "react-redux";
const Row = ({
  title,
  moviesURL,
  isLargeRow,
  genre,
  addToWatchlist,
  list,
  styling,
  history
}) => {
  const [Movies, setmovies] = useState([]);
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
  const handleRemoveWatchlist = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const response = await addToWatchlist(e.target.value);
    if (response.statusCode === 201) {
      setSuccess(true);
      // setTimeout(() => {
        window.location.reload(false);
            // }, 1000);
    }
  };
  const handleAddWatchlist = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
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
                {list ? (
                  <button
                    className="addToWatchlist"
                    value={movie._id}
                    onClick={handleRemoveWatchlist}
                  >
                    remove
                  </button>
                ) : (
                  <button
                    className="addToWatchlist"
                    value={movie._id}
                    onClick={handleAddWatchlist}
                  >
                    add
                  </button>
                )}
              
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default connect(null, { addToWatchlist })(withRouter(Row));

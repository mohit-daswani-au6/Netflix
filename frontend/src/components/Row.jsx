import React, { useState, useEffect } from "react";
import "../styles/Row.css";
import { Link } from "react-router-dom";
const Row = ({ title, moviesURL, isLargeRow,genre }) => {
  const [Movies, setmovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      
      const response = await moviesURL(genre);
      console.log(genre,response);
      if (response.statusCode === 200) {
        setmovies(response.movies);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div className="row">
      {/* <h2 style={{ marginLeft: "20px" }}>{title}</h2>
      <br />
      <div className="row_posters">
        {Movies.map((movie) => (
          <Link key={movie._id} to={`movies/${movie._id}`}>
            <img
              src={movie.posterImage}
              className={`row_poster $${isLargeRow && "row_posterLarge"}`}
              alt={movie.MovieName}
            />
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default Row;

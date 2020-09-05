import React, { useState, useEffect } from "react";
import "../styles/MovieDetailPopup.css";
import { withRouter, Link } from "react-router-dom";
import { addToWatchlist } from "../redux/actions/watchlistAction";
import { connect } from "react-redux";
const MovieDetailPopup = ({ movie, addToWatchlist }) => {
  const [Popup, setPopup] = useState(false);
  const [Imgurl, setImgurl] = useState();
  const [Duration, setDuration] = useState();
  const [movieGenres, setmovieGenres] = useState([]);
  useEffect(() => {
    if (movie != null) {
      console.log(movie);
      setPopup(true);
      const imgurl = `https://${movie.backgroundImage}`;
      setImgurl(imgurl);
      console.log(movie.runTime);
      const hours = Math.floor(movie.runTime / 60);

      const minutes = Math.floor(movie.runTime) - hours * 60;
      setDuration(`${hours}h ${minutes}m`);
      const genres = movie.genre;
      const genreArray = [];
      for (let genre in genres) {
        if (genres[genre] === true) {
          genreArray.push(genre);
        }
      }
      setmovieGenres(genreArray);
    }
  }, [movie]);

  const handleClick = () => {
    setPopup(false);
  };
  const handleAddtoMylist = async (e) => {
    e.preventDefault();
   await addToWatchlist(e.target.value);
  };
  return (
    <>
      {Popup ? (
        <header
          className="popup1"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url("${Imgurl}")`,
          }}
        >
          <button
          
            style={{
              background: "transparent",
              fontSize: "35px",
              float: "right",
              border: "transparent",
            }}
            onClick={handleClick}
          >
            X
          </button>
          <div className="popup_content">
            <h1 className="popup_title">{movie?.MovieName}</h1>
            <h3 className="popup_title" style={{ fontSize: "25px" }}>
              {movie.isAdult ? "A" : "U/A"} {Duration}
            </h3>
            <h3 className="popup_title" style={{ fontSize: "25px" }}>
              #{movie?.rating} in Imdb
            </h3>
            <div className="popup_description">{movie?.title}</div>
            <div className="popup_buttons">
              <Link to={`movies/${movie._id} `}>
                <button className="popup_button">Play</button>
              </Link>
              <button
                className="popup_button"
                value={movie._id}
                onClick={handleAddtoMylist}
              >
                + My list
              </button>
              <div className="popup_description">{movie?.description}</div>
              <div
                className="popup_description"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                {movieGenres.map((genre) => (
                  <h5 key={genre}> {genre} </h5>
                ))}
              </div>
            </div>
          </div>
          <div className="popup_fadeBottom" />
        </header>
      ) : null}
    </>
  );
};

export default connect(null, { addToWatchlist })(withRouter(MovieDetailPopup));

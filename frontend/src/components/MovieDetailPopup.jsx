import React, { useState, useEffect } from "react";
import "../styles/MovieDetailPopup.css";
import { withRouter, Link } from "react-router-dom";

const MovieDetailPopup = ({ movie, history }) => {
    const [Popup, setPopup] = useState(false)
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  let imgurl = "";
  console.log(movie)
  if (movie!=null) {
    console.log("Ss")
      setPopup(true)
     imgurl = `https://${movie.backgroundImage}`;
  }
  console.log(Popup)

  const handleClick =  () => {
      setPopup(false)
  };
  return (
    <>
      {Popup ? (
        <header
          className="banner"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url("${imgurl}")`,
          }}
        >
          <div className="banner_content">
            <h1 className="banner_title">{movie?.MovieName || movie?.title}</h1>
            <div className="banner_buttons">
              <Link to={`movies/${movie._id} `}>
                {" "}
                <button className="banner_button">Play</button>
              </Link>
              <button className="banner_button">My list</button>
              <div className="banner_description">
                {truncate(movie?.title, 150)}
              </div>
            </div>
          </div>
          <button style={{background:"transparent",fontSize:"15px"}} onClick={handleClick}>X</button>
          <div className="banner_fadeBottom" />
        </header>
      ) : null}
    </>
  );
};

export default withRouter(MovieDetailPopup);

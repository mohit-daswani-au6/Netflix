import React, { useState, useEffect } from "react";
import "../styles/Banner.css";

const Banner = ({ movies }) => {
  const movie = movies[Math.floor(Math.random() * movies.length)];
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url(${movie.posterImage})`,
      }}
    >
      <div className="banner_content">
        <h1 className="banner_title">{movie?.MovieName || movie?.title}</h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My list</button>
          <div className="banner_description">
            {truncate(movie?.description, 150)}
          </div>
        </div>
      </div>
      <div className="banner_fadeBottom"/>
    </header>
  );
};

export default Banner;

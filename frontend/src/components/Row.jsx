import React, { useState, useEffect } from "react";
import "../styles/Row.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link, withRouter } from "react-router-dom";
import { addToWatchlist } from "../redux/actions/watchlistAction";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import MovieDetailPopup from "./MovieDetailPopup";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
SwiperCore.use(Navigation);
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
  const [MovieDetail, setmovieDetail] = useState();
  const [perView, setperView] = useState(0);
  useEffect(() => {
    // const Perview=(screenSize)=>{
    //   if (screenSize <= 500) {
    //     setperView(1);
    //   } else if (screenSize >= 500 && screenSize <= 800) {
    //     setperView(2);
    //   }
    //   else if (screenSize >= 800 && screenSize <= 1050) {
    //     setperView(3);
    //   }else{
    //     setperView(4)
    //   }}
    //   Perview(document.body.clientWidth)
    const fetchMovies = async () => {
      const response = await moviesURL(genre);
      if (response) {
        if (response.statusCode === 201) {
          setmovies(response.movies);
        }
      }
    };
    fetchMovies();
  }, [genre]);

  const handlePopup = (e) => {
    e.preventDefault();
    const movie = JSON.parse(e.target.value);
    setmovieDetail(movie);
  };
  const handleRemoveWatchlist = async (e) => {
    e.preventDefault();
    const response = await addToWatchlist(e.target.value);
    if (response.statusCode === 201) {
      window.location.reload(false);
    }
  };
  const handleAddWatchlist = async (e) => {
    e.preventDefault();
    await addToWatchlist(e.target.value);
  };
  return (
    <div className="row1" style={{ styling }}>
      <h2 style={{ margin: "20px 20px 0px" }}>{title}</h2>
      <div>
        <Swiper
          className="row_posters"
          style={{ padding: "20px 0px" }}
          spaceBetween={0}
          id="main"
          slidesPerGroup={Math.floor((document.body.clientWidth/320))}
          slidesPerView={Math.floor((document.body.clientWidth/320))}
          navigation
          scrollbar={{ draggable: true }}

        >
          {Movies ? (
            Movies.map((movie) => (
              <SwiperSlide style={{ width: "25%" }} key={movie._id}>
                <div
                  key={movie._id}
                  className="container"
                  style={{ margin: "0px 7px" }}
                >
                  <Link to={`movies/${movie._id} `}>
                    <img
                      src={`https://${
                        isLargeRow ? movie.posterImage : movie.backgroundImage
                      }`}
                      className={`row_poster ${
                        isLargeRow && "row_posterLarge"
                      } `}
                      alt={movie.MovieName}
                    />
                  </Link>
                  <div style={{position:"absolute"}}>
                  <div className="title" style={{ marginTop: "-115px" }}>
                    <h4 style={{width:"150px"}}>{movie.MovieName}</h4>
                    <p className="popup_title" style={{ fontSize: "12px" }}>
                      {movie.isAdult ? "A" : "U/A"} {movie.runTime}min
                    </p>
                    <p className="popup_title" style={{ fontSize: "12px",marginTop:"-10px" }}>
                      #{movie?.rating} in Imdb
                    </p>
                  </div>
                  <hr />
                  <button
                  style={{outline:"transparent"}}
                    className={`popup ${
                      Movies.length <= 3 && "shortrowDetail"
                    }`}
                    value={JSON.stringify(movie)}
                    onClick={handlePopup}
                  />
                  {list ? (
                    <button
                    style={{outline:"transparent"}}

                      className={`removeMylist ${
                        Movies.length <= 3 && "shortrow"
                      }`}
                      value={movie._id}
                      title="Remove from my list"
                      onClick={handleRemoveWatchlist}
                    />
                  ) : (
                    <button
                    style={{outline:"transparent"}}

                      className={`addToWatchlist ${
                        Movies.length <= 3 && "shortrow"
                      }`}
                      value={movie._id}
                      title="Add to my list"
                      onClick={handleAddWatchlist}
                    />
                  )}
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <Spinner
              variant="dark"
              style={{ height: "5rem", width: "5rem", margin: "auto" }}
              animation="grow"
            />
          )}
        </Swiper>
      </div>
      <MovieDetailPopup movie={MovieDetail} />
    </div>
  );
};

export default connect(null, { addToWatchlist })(withRouter(Row));

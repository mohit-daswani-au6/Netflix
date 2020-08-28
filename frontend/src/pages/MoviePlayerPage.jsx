import React, { useEffect, useState } from "react";
import { withRouter, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/videoplayer.css";
import { getMovieDetail } from "../redux/actions/movieAction";
const MoviePlayerPage = ({ getMovieDetail, match }) => {
  const [movie, setmovie] = useState();
  const [error, seterror] = useState();
  const { MovieId } = match.params;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const response = await getMovieDetail(MovieId);
      console.log(response);
      if (response.statusCode === 201) {
        await setmovie(response.movie);
      } else {
        seterror(response.error);
      }
    };
    fetchMovieDetail();
  }, [MovieId]);

  const history = useHistory();
  return (
    <>
      {!error ? (
        <div className="videopage">
          {movie ? (
            <video
              style={{ outline: "none" }}
              onContextMenu={(e) => {
                e.preventDefault();
                return false;
              }}
              controlsList="nodownload"
              preload="auto"
              tabIndex="-1"
              className="video"
              controls
              autoPlay
            >
              <source src={`https://${movie.movie}`} type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
            </video>
          ) : null}
          <button className="back_button" onClick={() => history.goBack()}>
            x
          </button>
        </div>
      ) : (
        <Redirect to="/subscriptionPlans" />
      )}
    </>
  );
};

export default connect(null, { getMovieDetail })(withRouter(MoviePlayerPage));

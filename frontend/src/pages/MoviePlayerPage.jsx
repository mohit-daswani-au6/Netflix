import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import  '../styles/videoplayer.css'
import { getMovieDetail } from "../redux/actions/movieAction";
export class MoviePlayerPage extends Component {
  state = {
    movie: "",
  };
  componentDidMount() {
    const fetchMovieDetail = async () => {
      const { MovieId } = this.props.match.params;
      const response = await this.props.getMovieDetail(MovieId);
      console.log(response);
      if (response.statusCode === 201) {
        await this.setState({ movie: response.movie });
      }
      console.log(response);
    };
    fetchMovieDetail();
  }
  render() {
    return (
      <div className="videopage">
        {this.state.movie ? (
          <video onContextMenu={(e)=>  {e.preventDefault(); return false;}} controlsList="nodownload" preload="auto" tabIndex="-1"  className="video" controls>
            <source src={`https://${this.state.movie.movie}`} type="video/mp4"/>
            <source src="movie.ogg" type="video/ogg"/>
          </video>
        ) : null}
      </div>
    );
  }
}

export default connect(null, { getMovieDetail })(withRouter(MoviePlayerPage));

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

import { getMovieDetail } from "../redux/actions/movieAction";
export class MoviePlayerPage extends Component {
  state = {
    movie: "",
  };
  componentDidMount() {
    const fetchMovieDetail = async () => {
      const { MovieId } = this.props.match.params;
      const response = await this.props.getMovieDetail(MovieId);
      if (response.statusCode === 201) {
        this.setState({ movie: response.movie });
      }
      console.log(response);
    };
    fetchMovieDetail();
  }
  render() {
    return (
      <div>
        <video width="320" height="240" controls>
          {/* <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" /> */}
          <source
            src="https://mynetflixclone.s3.ap-south-1.amazonaws.com/Lootcase+_+Official+Trailer+_+Kunal+_+Gajraj+_+Vijay+_+Dir+-+Rajesh+Krishnan+_+Releasing+-+31st+July.mp4"
            type="video/mp4"
          ></source>
          {/* <source src="movie.ogg" type="video/ogg"> */}
        </video>
      </div>
    );
  }
}

export default connect(null, { getMovieDetail })(withRouter(MoviePlayerPage));

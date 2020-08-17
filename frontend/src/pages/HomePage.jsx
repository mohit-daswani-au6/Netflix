import React, { Component } from "react";
import Row from "../components/Row";
import { connect } from "react-redux";
import {
  getAllMovies,
  trendingMovies,
  getMoviesByGenre,
  topRatedMovies,
  fetchNetflixOriginals,
} from "../redux/actions/movieAction";
import Banner from "../components/Banner";
import NetflixNav from "../components/NetflixNav";

class HomePage extends Component {
  state = {
    movies: [],
  };
  componentDidMount() {
    const fetchMovies = async () => {
      const response = await this.props.getAllMovies();
      if (response.statusCode === 200) {
        this.setState({ movies: response.movies });
      }
    };
    fetchMovies();
  }
  render() {
    return (
      <div
        className="homePage"
        style={{
          backgroundColor: "#111",
        }}
      >
        <NetflixNav />

        {/* {this.state.movies.length !== 0 ? (
          <>
            <NetflixNav />
            <Banner movies={this.props.trendingMovies} />
            </>):null} */}
        <Row
          title="NETFLIX ORIGINALS"
          moviesURL={this.props.fetchNetflixOriginals}
          isLargeRow={true}
        />
        <Row title="Trending Now" moviesURL={this.props.trendingMovies} />
        <Row title="Top Rated" moviesURL={this.props.topRatedMovies} />
        <Row
          title="Action Movies"
          genre="Action"
          moviesURL={this.props.getMoviesByGenre}
        />
        <Row
          title="Comedy Movies"
          genre="Comedy"
          moviesURL={this.props.getMoviesByGenre}
        />
        <Row
          title="Horror Movies"
          genre="Horror"
          moviesURL={this.props.getMoviesByGenre}
        />
        <Row
          title="Thriller Movies"
          genre="Thriller"
          moviesURL={this.props.getMoviesByGenre}
        />
        <Row
          title="Adventure Movies"
          genre="Adventure"
          moviesURL={this.props.getMoviesByGenre}
        />
        <Row
          title="Drama Movies"
          genre="Drama"
          moviesURL={this.props.getMoviesByGenre}
        />
      </div>
    );
  }
}
export default connect(null, {
  getAllMovies,
  trendingMovies,
  getMoviesByGenre,
  topRatedMovies,
  fetchNetflixOriginals,
})(HomePage);

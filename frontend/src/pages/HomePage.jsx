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
import { Redirect, withRouter } from "react-router-dom";
import { Spinner } from "reactstrap";

class HomePage extends Component {
  state = {
    movies: [],
  };
  componentDidMount() {
    const fetchMovies = async () => {
      const response = await this.props.getAllMovies();


      if (response) {
        if (response.statusCode === 400) {
          this.props.history.push("/user/login");
        }
        if (response.statusCode === 200) {
          this.setState({ movies: response.movies });
        }
      }
    };
    fetchMovies();
  }

  render() {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    return (
      <>
        <NetflixNav />

        {!user ? (
          <Redirect to="/user/login" />
        ) : (
          <div
            className="homePage"
            style={{
              backgroundColor: "#111",
            }}
          >
            <NetflixNav />

            {this.state.movies.length !== 0 ? (
              <>
                <NetflixNav />
                <Banner movies={this.state.movies} />

                <br />
                <Row
                  title="NETFLIX ORIGINALS"
                  moviesURL={this.props.fetchNetflixOriginals}
                  isLargeRow={true}
                />
                <Row
                  title="Trending Now"
                  moviesURL={this.props.trendingMovies}
                />
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
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  marginTop: "250px",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "black",
                }}
              >
                <img
                  style={{
                    width: "200px",
                    position: "relative",
                    top: "160px",
                    objectFit: "contain",
                  }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
                  alt="Netflix logo"
                />
                <Spinner
                  style={{
                    height: "20rem",
                    width: "20rem",

                    background: "transparent",
                  }}
                  animation="grow"
                />
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
// const mapStateToProps = (state) => ({
//   user: state.userState.user,
// });
export default connect(null, {
  getAllMovies,
  trendingMovies,
  getMoviesByGenre,
  topRatedMovies,
  fetchNetflixOriginals,
})(withRouter(HomePage));

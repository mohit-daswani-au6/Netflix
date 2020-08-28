import React, { useEffect, useState } from "react";
import Row from "../components/Row";
import { searchMovies } from "../redux/actions/movieAction";
import { connect } from "react-redux";
import "../styles/listPage.css";
import NetflixNav from "../components/NetflixNav";
import Footer from "../components/Footer";
import { withRouter } from "react-router-dom";
import { parse } from "qs";
const SearchPage = ({ location, searchMovies,history }) => {
  const [query, setquery] = useState();
  const q = parse(location.search, { ignoreQueryPrefix: true }).name;
  useEffect(() => {
    if (q.length > 0) {
      setquery(q);
    } else {

history.push("/")
    }
  }, [q]);
  const extrastyle = {
    background: "black",
    padding: "0 100px",
    color:"white",
    width:"100%",
    margin:"20px"
  };
  return (
    <>
      <NetflixNav />

      <div style={{ mariginTop: "50px" }}>
        <div
          className="listPage"
          style={{
            backgroundColor: "#111",
            paddingTop: "50px",
          }}
        >
          <Row title="Search results" moviesURL={searchMovies} genre={query} />
        </div>
      </div>
      <Footer extrastyle={extrastyle} />
    </>
  );
};

export default connect(null, { searchMovies })(withRouter(SearchPage));

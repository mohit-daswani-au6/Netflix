import React, { useEffect } from "react";
import Row from "../components/Row";
import { connect } from "react-redux";
import "../styles/listPage.css";
import NetflixNav from "../components/NetflixNav";
import Footer from "../components/Footer";
import { latestMovies } from "../redux/actions/movieAction";
const LatestPage = ({ latestMovies }) => {
const extrastyle={
  margin: "20px",
    background: "black",
    padding: "0 100px",
    color:"white",
    width:"100%"
}
  return (
    <>
    <NetflixNav/>

      <div style={{mariginTop:"50px"}}>
    <div
      className="listPage"
      style={{
        backgroundColor: "#111",
        paddingTop:"50px"
      }}
    >
      <Row title="Latest "moviesURL={latestMovies}  />
    </div>
    </div>
    <Footer extrastyle={extrastyle}/>
    </>
  );
};

export default connect(null, { latestMovies })(LatestPage);

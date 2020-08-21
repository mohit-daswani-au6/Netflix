import React, { useEffect } from "react";
import Row from "../components/Row";
import { getWatchlist } from "../redux/actions/watchlistAction";
import { connect } from "react-redux";
import "../styles/listPage.css";
import NetflixNav from "../components/NetflixNav";
const MylistPage = ({ getWatchlist }) => {

  return (
    <>
    <NetflixNav/>

      <div style={{mariginTop:"50px"}}>
    <div
      className="listPage"
      style={{
        backgroundColor: "#111",
        height: "48vw",
        paddingTop:"50px"
      }}
    >

      <Row title="My list"moviesURL={getWatchlist} list="true" />
    </div>
    </div>
    </>
  );
};

export default connect(null, { getWatchlist })(MylistPage);

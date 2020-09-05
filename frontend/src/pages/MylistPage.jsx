import React from "react";
import Row from "../components/Row";
import { getWatchlist } from "../redux/actions/watchlistAction";
import { connect } from "react-redux";
import "../styles/listPage.css";
import NetflixNav from "../components/NetflixNav";
import Footer from "../components/Footer";
import { Redirect } from "react-router-dom";
const MylistPage = ({ getWatchlist }) => {
  const extrastyle = {
    margin: "20px",
    background: "black",
    padding: "0 100px",
    color: "white",
    width: "100%",
  };
  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  return (
    <>
      <NetflixNav />
      {!user ? (
        <Redirect to="/user/login" />
      ) : (
        <div style={{ mariginTop: "50px" }}>
          <div
            className="listPage"
            style={{
              backgroundColor: "black",
              paddingTop: "50px",
            }}
          >
            <Row title="My list" moviesURL={getWatchlist} list="true" />
          </div>
        </div>
      )}
      <Footer extrastyle={extrastyle} />
    </>
  );
};

export default connect(null, { getWatchlist })(MylistPage);

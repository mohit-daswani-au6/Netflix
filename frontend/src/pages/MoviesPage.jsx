import React, { useState } from "react";
import Row from "../components/Row";
import { connect } from "react-redux";
import "../styles/listPage.css";
import NetflixNav from "../components/NetflixNav";
import Footer from "../components/Footer";
import { getMoviesByLanguage } from "../redux/actions/movieAction";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Redirect } from "react-router-dom";
const MoviesPage = ({ getMoviesByLanguage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [Language, setLanguage] = useState();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleEnglishLanguage = (e) => {
    e.preventDefault();
    setLanguage(e.target.value);
  };
  const handleHindiLanguage = (e) => {
    setLanguage(e.target.value);
  };
  const extrastyle = {
    margin: "20px",
    background: "black",
    padding: "0 100px",
    width: "100%",
    outline: "transparent",
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
            <Dropdown
              isOpen={dropdownOpen}
              style={{ marginLeft: "10px" }}
              toggle={toggle}
            >
              <DropdownToggle
                className="languageButton"
                style={{
                  background: "transparent",
                  border: "black",
                  fontSize: "30px",
                  marginLeft: "25px",
                }}
                caret
              >
                Language
              </DropdownToggle>
              <DropdownMenu style={{ background: "black", color: "white" }}>
                <DropdownItem
                  style={{ color: "gray" }}
                  value="english"
                  onClick={handleEnglishLanguage}
                >
                  English
                </DropdownItem>
                <DropdownItem
                  style={{ color: "gray" }}
                  value="hindi"
                  onClick={handleHindiLanguage}
                >
                  Hindi
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Row genre={Language} moviesURL={getMoviesByLanguage} />
          </div>
        </div>
      )}
      <Footer extrastyle={extrastyle} />
    </>
  );
};

export default connect(null, { getMoviesByLanguage })(MoviesPage);

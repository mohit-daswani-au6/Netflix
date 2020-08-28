import React, { useState, useEffect } from "react";
import "../styles/netflixNav.css";
import { NavLink, Link, withRouter } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { searchMovies } from "../redux/actions/movieAction";
const NetflixNav = ({ logoutUser, history, color, searchMovies }) => {
  const [show, handleShow] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleLogout = async () => {
    await logoutUser();
    history.push("/user/login");
  };
  const handleSearchChange = async (e) => {
    e.persist()
    setTimeout(() => {
      history.push(`/search?name=${e.target.value}`)
    }, 1000);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      // window.removeEventListener("scroll")
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`} style={{ background: color }}>
      
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix logo"
      />
      <div style={{ display: "flex", marginLeft: "170px" }}>
        <p>
          <NavLink className="navlinkStyle" to="/">
            Home
          </NavLink>
        </p>
        <p>
          <NavLink className="navlinkStyle" to="/movies/language">
            Movies
          </NavLink>
        </p>
        <p>
          <NavLink className="navlinkStyle" to="/mylist">
            My List
          </NavLink>
        </p>
        <p>
          <NavLink className="navlinkStyle" to="/latest">
            Latest
          </NavLink>
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <input
          className="search-input"
          type="search"
          style={{ paddingLeft: "30px",color:"white"}}
          onChange={handleSearchChange}
          placeholder="Enter Movie Name..."
        />
        <Dropdown
          isOpen={dropdownOpen}
          style={{ marginLeft: "10px" }}
          toggle={toggle}
        >
          <DropdownToggle
            style={{ background: "transparent",border:"black" }}
            caret
          ></DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <Link to="/yourAccount">Account </Link>
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>
              Sign out of Netflix
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {/* <input type="text" placeholder="Enter MovieName" />

          <button onClick={handleSearchClick}>
            {/* {searchBar ? ( */}

        {/* ) : null} */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default connect(null, { logoutUser, searchMovies })(
  withRouter(NetflixNav)
);

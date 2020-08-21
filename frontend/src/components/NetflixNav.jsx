import React, { useState, useEffect } from "react";
import "../styles/netflixNav.css";
import { NavLink, Link, withRouter } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
// import { NavItem, NavLink } from "reactstrap";
const NetflixNav = ({ logoutUser, history, color }) => {
  const [show, handleShow] = useState();
  const [searchBar, setSearchBar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleLogout = async () => {
    await logoutUser();
    history.push("/user/login");
  };
  const handleSearchClick = () => {
    setSearchBar(!searchBar);
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

  const handleClick = async () => {
    setSearchBar(!searchBar);
  };
  return (
    <div className={`nav ${show && "nav_black"}`} style={{ background: color }}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix logo"
      />
      <div style={{ display: "flex", marginLeft: "130px" }}>
        <p>
          <NavLink className="navlinkStyle" to="/">
            Home
          </NavLink>
        </p>
        {/* <p>
          <NavLink className="navlinkStyle" to="/movies">
            Movies
          </NavLink>
        </p> */}
        <p>
          <NavLink className="navlinkStyle" to="/mylist">
            My List
          </NavLink>
        </p>
        <p>
          <NavLink className="navlinkStyle" to="/">
            Latest
          </NavLink>
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <input
          className="search-input"
          type="search"
          placeholder="Enter Movie Name..."
        />
        <Dropdown
          isOpen={dropdownOpen}
          style={{ marginLeft: "10px" }}
          toggle={toggle}
        >
          <DropdownToggle
            style={{ background: "black" }}
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

export default connect(null, { logoutUser })(withRouter(NetflixNav));

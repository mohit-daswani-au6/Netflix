import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/netflixNav.css";
import { logoutUser } from "../redux/actions/userActions";
import { NavLink, withRouter } from "react-router-dom";
import { Button } from "reactstrap";
const NavBar = ({ logoutUser, history }) => {
  const handleLogout = async () => {
    await logoutUser();
    history.push("/user/login");
  };
  let user=null;
  if (localStorage.getItem("user")) {
    const userJSON = localStorage.getItem("user");
    user = JSON.parse(userJSON);
  }
  return (
    <div className={`nav`} style={{display:"flex",justifyContent:"flex-end"}}>
      <img 
        style={{width:"150px"}}
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix logo"
      />
      {user?(
        <Button color="link" style={{color:"black",fontSize:"25px"}} className="ButtonStyle" onClick={handleLogout}>
          Sign Out
        </Button>
      ) : null}
    </div>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     user: state.userState.user,
//   };
// };
export default connect(null, { logoutUser })(withRouter(NavBar));

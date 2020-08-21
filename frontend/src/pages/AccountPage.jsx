import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import NavBar from "../components/NavBar";
import NetflixNav from "../components/NetflixNav";
import Footer from "../components/Footer";

const AccountPage = () => {
  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  return (
    <>
      <NetflixNav color="black" />
      <Container style={{marginTop: "100px"}}>
        {user ? (
          <>
            <div>
              <h1>Account</h1>
              <span>
                <strong>
                  Member since{" "}
                  {new Date(user.user.createdAt).toLocaleString("default", {
                    month: "long",
                  })}{" "}
                  {new Date(user.user.createdAt).getFullYear()}
                </strong>
              </span>
            </div>
            <hr />
            <Row>
              <Col xs="3">MEMBERSHIP & BILLING</Col>
              <Col xs="6">
                <p>{user.user.email}</p>
                <p>Password: ********</p>
                <p>Phone: {user.user.phoneNo}</p>
              </Col>
              <Col xs="3">
                <Link to="/user/changeEmail"> Change account email</Link>
                <br />
                <br />

                <Link to="/user/changePassword"> Change password</Link>
                <br />
                <br />

                <Link to="/user/changePhoneNumber"> Change phone number</Link>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs="3">MEMBERSHIP & BILLING</Col>
              <Col xs="6">
                <h2>Premium </h2> <h4>Monthly</h4>
              </Col>
              <Col xs="3">
                <Link to="#"> Change Plan</Link>
              </Col>
            </Row>
          </>
        ) : (
          <Redirect to="/user/login" />
        )}
      </Container>
      <Footer/>
    </>
  );
};
// const mapStateToProps = (state) => ({
//   user: state.userState.user,
// });

export default connect(null)(AccountPage);

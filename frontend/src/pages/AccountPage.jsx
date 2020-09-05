import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import NetflixNav from "../components/NetflixNav";
import Footer from "../components/Footer";

const AccountPage = () => {
  let user = null;
  if (localStorage.getItem("user")) {
    const userJSON = localStorage.getItem("user");
    user = JSON.parse(userJSON);
    console.log(user.user);
  }
  const extrastyle = {
    background: "white",
    padding: "10px",
  };
  return (
    <>
      <NetflixNav color="black" />

      <div style={{ background: "white", marginTop: "50px" }}>
        <Container style={{ padding: "60px" }}>
          {user ? (
            <>
              <div style={{display:"flex"}}>
                <h1>Account </h1>
                <span
                  style={{
                    background: "linear-gradient(45deg, #353f35, #5a785a)",
                    color: "white",
                    height:"30px",
                    placeSelf:"center",
                    fontSize: "15px",
                    marginLeft:"20px",
                    padding: "5px",
                  }}
                >
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
              {user.user.isthirdparty === false ? (
                <>
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

                      <Link to="/user/changePhoneNumber">
                        Change phone number
                      </Link>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <br />
                  <h1>You have login through third party</h1>
                  <br />
                  <br />
                </>
              )}
              <hr />

              <Row>
                <Col xs="3">PLAN DETAILS</Col>
                <Col xs="6">
                  <h2>Premium </h2> <h4>Monthly</h4>
                </Col>
                <Col xs="3">
                  <Link to="/subscriptionPlans"> Change Plan</Link>
                </Col>
              </Row>
            </>
          ) : (
            <Redirect to="/user/login" />
          )}
        </Container>
        <Footer extrastyle={extrastyle} />
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  users: state.userState.user,
});

export default connect(mapStateToProps)(AccountPage);

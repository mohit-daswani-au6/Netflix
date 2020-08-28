import React, { Component } from "react";
import { connect } from "react-redux";
import { emailVerification } from "../redux/actions/userActions";
import { withRouter } from "react-router-dom";
import Axios from "axios";

class EmailVerificationPage extends Component {
  componentDidMount() {
    const token = this.props.match.params.token;
    const verfication = async (token) => {
      const { data } = await Axios(
        `https://powerful-temple-56540.herokuapp.com/user/verify/${token}`
      );
      if (data === "email verified") {
        this.props.history.push("/user/login");
      }
    };
    verfication(token);
  }

  render() {
    return (
      <div>
        <h1>Email Verified..yipeee</h1>
        <h4>redirecting...</h4>
      </div>
    );
  }
}

export default connect(null, { emailVerification })(
  withRouter(EmailVerificationPage)
);

import React, { Component } from "react";
import { connect } from "react-redux";
import { emailVerification } from "../redux/actions/userActions";
import { withRouter } from "react-router-dom";
import Axios from "axios";

class EmailVerificationPage extends Component {
  componentDidMount() {
    const token = this.props.match.params.token;
    const verfication = async (token) => {
      const data = await Axios(`http://localhost:5555/user/verify/${token}`);
      console.log(data);
    };
    verfication(token);
  }

  render() {
    return <div>hi there</div>;
  }
}

export default connect(null, { emailVerification })(
  withRouter(EmailVerificationPage)
);

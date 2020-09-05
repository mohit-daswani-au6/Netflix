import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/registerPage.css";
import { connect } from "react-redux";
import Footer from "../components/Footer";
import { ChangeforgotPassword } from "../redux/actions/userActions";
import { withRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Button } from "reactstrap";
const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "password must be minimum length 0f 8!")
    .matches(/[a-z]/, "must have lowercase")
    .matches(/[A-Z]/, "must have uppercase")
    .matches(/[0-9]/, "must have number")
    .required("Required"),
});

class ForgotPasswordChange extends Component {
  state = {
    error: "",
    success: false,
  };
  handleSubmit = async (data) => {
    const { password, cpassword } = data;
    const obj = { newpassword: password, cpassword };
    const token = this.props.match.params.token;
    const resp = await this.props.ChangeforgotPassword(obj, token);
    console.log(resp);
    if (resp.statusCode === 400) {
      console.log(resp.error);
      this.setState({ error: resp.error });
    } else if (resp.statusCode === 201) {
      this.setState({ success: true });
      console.log(this.state.success);
      setTimeout(() => {
        this.props.history.push("/user/login");
      }, 2000);
    }
    setTimeout(() => {
      this.setState({ error: "" });
    }, 5000);
  };

  render() {
    const extrastyle = {
      background: "black",
      padding: "0px 100px",
      width: "100%",
      color: "white",
      margin: "200px 0px",
    };
    return (
      <div className="pageLayout">
        <NavBar />
        {!this.state.success ? (
          <div className="boxstyle" style={{ height: "350px" }}>
            <h1 style={{ color: "white" }}>Change password</h1>
            <br />
            <br />
            <Formik
              initialValues={{
                password: "",
                cpassword: "",
              }}
              validationSchema={ChangePasswordSchema}
              onSubmit={this.handleSubmit}
            >
              {({ errors, touched }) => (
                <Form
                  style={{
                    display: "flex",
                    color: "coral",
                    flexDirection: "column",
                  }}
                >
                  <Field
                    style={{ fontSize: "18px", padding: "10px" }}
                    placeholder=" New password"
                    name="password"
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : (
                    <br />
                  )}
                  <Field
                    style={{ fontSize: "18px", padding: "10px" }}
                    placeholder=" Confirm password"
                    name="cpassword"
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : (
                    <br />
                  )}
                  <br />
                  {this.state.error ? <p>{this.state.error}</p> : null}

                  <Button color="danger" type="submit">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <h1
            style={{
              color: "white",
              padding: "250px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Password successfully changed...Redirecting to login page
          </h1>
        )}
        <Footer extrastyle={extrastyle} />
      </div>
    );
  }
}
export default connect(null, { ChangeforgotPassword })(
  withRouter(ForgotPasswordChange)
);

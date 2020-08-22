import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import "../styles/registerPage.css";
import { forgotPasswordLink } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Button } from "reactstrap";
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

class ForgotPasswordPage extends Component {
  state = {
    error: "",
    success: false,
  };
  handleSubmit = async (data) => {
    const resp = await this.props.forgotPasswordLink(data);
    console.log(resp);
    if (resp.statusCode === 403) {
      console.log(resp.error);
      this.setState({ error: resp.error });
    } else if (resp.statusCode === 200) {
      this.setState({ success: true });
      // this.props.history
    }
    setTimeout(() => {
      this.setState({ error: "" });
    }, 3000);
    // this.props.history.push("/");
  };

  render() {
    const extrastyle = {
      background: "black",
      margin: "0px",
      padding: "0px 100px",
      width: "100%",
      color: "white",
    };
    return (
      <div className=" pageLayout">
        <NavBar />
        {!this.state.success ? (
          <div className="boxstyle" style={{ height: "350px" }}>
            <h1 style={{ color: "white" }}>Forgot Password?</h1>
            <br />
            <br />
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={forgotPasswordSchema}
              onSubmit={this.handleSubmit}
            >
              {({ errors, touched }) => (
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "coral",
                  }}
                >
                  <Field
                    style={{ fontSize: "18px", padding: "10px" }}
                    placeholder="  name@example.com"
                    name="email"
                    type="email"
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
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
            <br/>
            <br/>
            <Link
                to="/user/login"
                style={{ fontSize: "17px", color: "white",    display: "flex",
                justifyContent: "center" }}
              >
                Sign In
              </Link>
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
            Email Sent Successfully
          </h1>
        )}

        <Footer extrastyle={extrastyle} />
      </div>
    );
  }
}
export default connect(null, { forgotPasswordLink })(ForgotPasswordPage);

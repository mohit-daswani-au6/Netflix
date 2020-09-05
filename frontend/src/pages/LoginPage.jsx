import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/registerPage.css";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import Footer from "../components/Footer";
import {
  loginUser,
  facebookLogin,
  googleLogin,
} from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from "reactstrap";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter a valid email address."),
  password: Yup.string()
    .min(8, "Password must be minimum length 0f 8!")
    .matches(/[a-z]/, "Must have lowercase")
    .matches(/[A-Z]/, "Must have uppercase")
    .matches(/[0-9]/, "Must have number")
    .required("Required"),
});

class LoginPage extends Component {
  state = {
    error: "",
    thirdpartyError: "",
  };
  responseGoogle = async (response) => {
    console.log(response);
    const resp = await this.props.googleLogin({
      accessToken: response.accessToken,
      profile: response.profileObj,
    });
    console.log(resp);
    if (resp) {
      if (resp.statusCode === 400) {
        await this.setState({ thirdpartyError: resp.error });

        setTimeout(() => {
          this.setState({ thirdpartyError: "" });
        }, 3000);
      } else if (resp.statusCode === 201) {
        this.props.history.push("/");
      }
    }
  };

  handleSubmit = async (data) => {
    const { email, password } = data;
    const obj = { email, password };

    const resp = await this.props.loginUser(obj);
    if (resp.statusCode === 400) {
      console.log(resp.error);
      await this.setState({ thirdpartyError: resp.error });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
    } else if (resp.statusCode === 201) {
      this.props.history.push("/");
    }
  };
  responseFacebook = async (response) => {
    if(response.status!=="unknown"){
    const resp = await this.props.facebookLogin(response);
    if (resp) {
      if (resp.statusCode === 400) {
        console.log(resp.error);
        await this.setState({ thirdpartyError: resp.error });
        setTimeout(() => {
          this.setState({ thirdpartyError: "" });
        }, 3000);
      } else if (resp.statusCode === 201) {
        this.props.history.push("/");
      }
    }}
    else {
      this.props.history.push("/user/login")
    }
  };
  render() {
    const extrastyle = {
      background: "black",
      margin: "75px 0px",
      padding: "0px 100px",
      width: "100%",
      color: "white",
    };
    return (
      <div className="pageLayout">
        <NavBar />
        <div className="boxstyle">
          <h1 style={{ color: "white" }}>Sign In</h1>
          <br />
          <br />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
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
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                {errors.email && touched.email ? <p>{errors.email}</p> : <br />}
                <br />
                <Field
                  style={{ fontSize: "18px", padding: "10px" }}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : (
                  <br />
                )}
                {this.state.error ? <p>{this.state.error}</p> : null}
                <Button
                  size="lg"
                  color="danger"
                  style={{ background: "red" }}
                  type="submit"
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <Link
            to="/user/forgotPassword"
            style={{
              marginTop: "5px",
              float: "right",
              fontSize: "13px",
              color: "#cacaca",
            }}
          >
            forgot password?
          </Link>
          <br />
          <br />
          <br />
          <FacebookLogin
            appId="908576282981444"
            // autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
            render={(renderProps) => (
              <button
              className="thirdpartyLogin"  
                style={{
                  color: "#cacaca",
                  background: "transparent",
                  border: "transparent",
                }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img
                  src="https://1000logos.net/wp-content/uploads/2016/11/facebook-symbol.jpg"
                  alt="facebook"
                  height="25px"
                />
                Login with Facebook
              </button>
            )}
          />
          <br />
          <GoogleLogin
            clientId="749284168506-lc5t8hml4japl89fpmti3lfsu9mpm32u.apps.googleusercontent.com"
            buttonText="Login"
            render={(renderProps) => (
              <button
              className="thirdpartyLogin"
                style={{
                  color: "#cacaca",
                  background: "transparent",
                  border: "transparent",
                }}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img
                  style={{ marginLeft: "-5px" }}
                  src="https://i1.wp.com/www.androidawareness.com/wp-content/uploads/2018/10/google-icon.png?fit=500%2C500"
                  alt="google"
                  height="40px"
                />
                Login with Google
              </button>
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <br />
          {this.state.thirdpartyError ? (
            <p style={{ color: "coral" }}>{this.state.thirdpartyError}</p>
          ) : null}

          <br />
          <p style={{ color: "#cacaca" }}>
            New to Netflix?{" "}
            <Link
              to="/user/register"
              style={{ fontSize: "16px", color: "white" }}
            >
              Sign Up Now
            </Link>
          </p>
          <p style={{ color: "#cacaca", fontSize: "12px" }}>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
          </p>
        </div>
        <Footer extrastyle={extrastyle} />
      </div>
    );
  }
}
export default connect(null, { loginUser, facebookLogin, googleLogin })(
  LoginPage
);

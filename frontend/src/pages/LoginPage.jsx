import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/registerPage.css";
import { connect } from "react-redux";
import Footer from "../components/Footer";
import { loginUser, facebookLogin } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import NavBar from "../components/NavBar";
// import FacebookLogin from 'react-facebook-login';
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
  };
  // componentDidMount(){
  //   const fetch=async()=>{
  //  const resp=await this.props.facebookLogin()
  //  console.log(resp)
  // }
  // fetch()}
  handleSubmit = async (data) => {
    const { email, password } = data;
    const obj = { email, password };

    const resp = await this.props.loginUser(obj);
    console.log(resp);
    if (resp.statusCode === 400) {
      console.log(resp.error);
      setTimeout(() => {
        this.setState({ error: "" });
      }, 3000);
      this.setState({ error: resp.error });
    } else if (resp.statusCode === 201) {
      this.props.history.push("/");
    }
  };
   onChange(value) {
    console.log("Captcha value:", value);
  }
  handleFacebookLogin = async () => {
    const resp = await this.props.facebookLogin();
    console.log(resp);
    //  const res=await window.open("http://localhost:5555/facebook", "_self");
    //  console.log(res)
    // };
    // responseFacebook = (response) => {
    //   console.log(response);
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
                <Button size="lg" color="danger" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <Link
            to="/user/forgotPassword"
            style={{ float: "right", fontSize: "13px", color: "#cacaca" }}
          >
            forgot password?
          </Link>
          {/* <button onClick={this.handleFacebookLogin}>facebook</button> */}
          {/* <ReCAPTCHA sitekey="6Lec7MMZAAAAAEBHR4tuamupufXEuGpioBfjZU3-" onChange={this.onChange} />, */}
          {/* <FacebookLogin
            appId="908576282981444"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          /> */}
          ,
          <br />
          <br />
          <p style={{ color: "#cacaca" }}>
            New to Netflix?
            <Link
              to="/user/register"
              style={{ fontSize: "17px", color: "white" }}
            >
              {" "}
              Sign Up Now
            </Link>
          </p>
        </div>
        <Footer extrastyle={extrastyle} />
      </div>
    );
  }
}
export default connect(null, { loginUser, facebookLogin })(LoginPage);

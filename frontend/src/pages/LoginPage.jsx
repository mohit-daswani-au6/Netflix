import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/registerPage.css"
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Button } from "reactstrap";
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Please enter a valid email address."),
  password: Yup.string()
    .min(8, "password must be minimum length 0f 8!")
    .matches(/[a-z]/, "must have lowercase")
    .matches(/[A-Z]/, "must have uppercase")
    .matches(/[0-9]/, "must have number")
    .required("Required"),
});

class LoginPage extends Component {
  state = {
    error: "",
  };

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

  render() {
    return (
      <div className="pageLayout">
        <NavBar />
        <div className="boxstyle">
          <h1 style={{color:"white"}}>Sign In</h1>
          <br/>
          <br/>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={this.handleSubmit}
          >
            {({ errors, touched }) => (
              <Form style={{ display: "flex", flexDirection: "column",color:"coral" }}>
                <Field style={{fontSize:"18px",padding:"10px"}} className="input" name="email" type="email" placeholder="Email"/>
                {errors.email && touched.email ? (
                  <p>{errors.email}</p>
                ) : <br/>}
                <br/>
                <Field style={{fontSize:"18px",padding:"10px"}} name="password" type="password" placeholder="Password" />
                {errors.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : <br/>}
                {this.state.error ? <p>{this.state.error}</p> : null}
                <Button size="lg" color="danger" type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
          <Link to="/user/forgotPassword" style={{float: "right",fontSize:"13px",color:"#cacaca"}}>forgot password?</Link>
          <br />
          <br />
          <p style={{color:"#cacaca"}}>
            New to Netflix? 
              <Link to="/user/register" style={{fontSize:"17px",color:"white"}}> Sign Up Now</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default connect(null, { loginUser })(LoginPage);

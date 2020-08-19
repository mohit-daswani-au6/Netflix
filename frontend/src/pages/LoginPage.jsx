import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
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
      <div>
        <h1>Login</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <h3>email</h3>
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <h3>password</h3>
              <Field name="password" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <br />
              {this.state.error ? <p>{this.state.error}</p> : null}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        <Link to="/user/forgotPassword">forgot password?</Link>
        <br />
        <p>
          New User?
          <button>
            <Link to="/user/register">Sign Up</Link>
          </button>
        </p>
      </div>
    );
  }
}
export default connect(null, { loginUser })(LoginPage);

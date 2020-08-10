import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "password must be minimum length 0f 8!")
    .matches(/[a-z]/, "must have lowercase")
    .matches(/[A-Z]/, "must have uppercase")
    .matches(/[0-9]/, "must have number")
    .required("Required"),
  phoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
});

class RegisterPage extends Component {
  state = {
    emailVerificaionPage: false,
    name: "",
    error: {
      email: "",
      phoneNo: "",
    },
  };

  handleSubmit = async (data) => {
    const { email, password, name, phoneNo } = data;
    this.setState({ name: name });
    const obj = { name, email, password, phoneNo };
    console.log(obj);
    const response = await this.props.registerUser(obj);
    if (response.statusCode === 201) {
      this.setState({ emailVerificaionPage: true });
      localStorage.setItem("user",response.newUser)
    } else if (response.error.hasOwnProperty("email")) {
      console.log(response.error.email);
      this.setState({ error: { email: response.error.email } });
    } else if (response.error.hasOwnProperty("phoneNo")) {
      console.log(response.error.phoneNo);
      this.setState({ error: { phoneNo: response.error.phoneNo } });
    }
    setTimeout(() => {
      this.setState({ error: "" });
    }, 3000);
  };

  render() {
    return (
      <>
        {!this.state.emailVerificaionPage ? (
          <div>
            <h1>Signup</h1>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                phoneNo: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={this.handleSubmit}
            >
              {({ errors, touched }) => (
                <Form style={{ display: "flex", flexDirection: "column" }}>
                  <h3>name</h3>
                  <Field name="name" />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                  <h3>email</h3>
                  <Field name="email" type="email" />
                  {this.state.error.email ? (
                    <p>{this.state.error.email}</p>
                  ) : null}
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                  <h3>password</h3>
                  <Field name="password" type="password" />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <h3>phone number</h3>
                  <Field name="phoneNo" type="number" />
                  {this.state.error.phoneNo ? (
                    <p>{this.state.error.phoneNo}</p>
                  ) : null}

                  {errors.phoneNo && touched.phoneNo ? (
                    <div>{errors.phoneNo}</div>
                  ) : null}
                  <br />
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div>
            <h1>
              Hi {this.state.name}, Kindly verify your email first then login
              again
            </h1>
            <button>
              <a href="/user/login">Login</a>
            </button>
          </div>
        )}
      </>
    );
  }
}
export default connect(null, { registerUser })(RegisterPage);

import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Button } from "reactstrap";
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
      localStorage.setItem("user", response.newUser);
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
      <div className="pageLayout">
        <NavBar />

        {!this.state.emailVerificaionPage ? (
          <div className="boxstyle">
            <h1 style={{ color: "white" }}>Sign Up</h1>
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
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "coral",
                  }}
                >
                  <Field
                    className="input"
                    placeholder="Name"
                    style={{ fontSize: "18px", padding: "10px", marginTop:"15px"
 }}
                    name="name"
                  />
                  {errors.name && touched.name ? <p>{errors.name}</p> : <br/>}
                  <Field
                    className="input"
                    placeholder="Email"
                    style={{ fontSize: "18px", padding: "10px", 
 }}
                    name="email"
                    type="email"
                  />
                  {this.state.error.email ? (
                    <p>{this.state.error.email}</p>
                  ) : null}
                  {errors.email && touched.email ? <p>{errors.email}</p> : <br/>}
                  <Field
                    className="input"
                    placeholder="Password"
                    style={{ fontSize: "18px", padding: "10px", 
 }}
                    name="password"
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <p>{errors.password}</p>
                  ) : <br/>}
                  <Field
                    className="input"
                    placeholder="Phone number"
                    style={{ fontSize: "18px", padding: "10px", 
 }}
                    name="phoneNo"
                    type="number"
                  />
                  {this.state.error.phoneNo ? (
                    <p>{this.state.error.phoneNo}</p>
                  ) : null}

                  {errors.phoneNo && touched.phoneNo ? (
                    <p>{errors.phoneNo}</p>
                  ) : <br/>}
                  <br />
                  <Button size="lg" color="danger" type="submit">Submit</Button>
                </Form>
              )}
            </Formik>
            <br />
            <br/>
            <p style={{color:"#cacaca"}}>
              Already a user? 
              <Link style={{fontSize:"17px",color:"white"}} to="/user/login"> Sign In</Link>
            </p>
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
      </div>
    );
  }
}
export default connect(null, { registerUser })(RegisterPage);

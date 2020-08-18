import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { ChangePassword } from "../redux/actions/userActions";
import { Link, withRouter, Redirect } from "react-router-dom";
const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "password must be minimum length 0f 8!")
    .matches(/[a-z]/, "must have lowercase")
    .matches(/[A-Z]/, "must have uppercase")
    .matches(/[0-9]/, "must have number")
    .required("Required"),
    oldpassword: Yup.string()
    .required("Required"),
    cpassword: Yup.string()
    .required("Required"),
});

class ChangePasswordPage extends Component {
  state = {
    error:"",
    success: false,
  };
  handleSubmit = async (data) => {
    const { oldpassword, password, cpassword } = data;
    const obj = { oldpassword, newpassword: password, cpassword };
    const resp = await this.props.ChangePassword(obj);
    console.log(this.props.user)
    console.log(resp);
    if (resp.status === "failed") {
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
    return (
      <div>
          {!this.props.user?<Redirect to="/user/login"/>:
          <>
        <h1>Change password</h1>
        <Formik
          initialValues={{
            oldpassword: "",
            password: "",
            cpassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <h3>old password</h3>
              <Field name="oldpassword" type="password" />
              {errors.oldpassword && touched.oldpassword ? (
                <div>{errors.oldpassword}</div>
              ) : null}
              <h3>new password</h3>
              <Field name="password" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <h3>confirm password</h3>
              <Field name="cpassword" type="password" />
              {errors.cpassword && touched.cpassword ? (
                <div>{errors.cpassword}</div>
              ) : null}
              <br />
              {this.state.error ? <p>{this.state.error}</p> : null}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        {this.state.success ? <h1>password successfully changed Redirecting to login</h1> : null}
        </>}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
    user: state.userState.user,
  });
export default connect(mapStateToProps, { ChangePassword })(
  withRouter(ChangePasswordPage)
);

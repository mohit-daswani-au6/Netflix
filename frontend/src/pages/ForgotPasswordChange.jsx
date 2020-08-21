import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { ChangeforgotPassword } from "../redux/actions/userActions";
import { Link, withRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
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
      this.props.history.push("/user/login");
    }
    setTimeout(() => {
      this.setState({ error: "" });
    }, 5000);
  };

  render() {
    return (
      <div>
              <NavBar/>

        <h1>Change password</h1>
        <Formik
          initialValues={{
            password: "",
            cpassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <h3>new password</h3>
              <Field name="password" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <h3>confirm password</h3>
              <Field name="cpassword" type="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <br />
              {this.state.error ? <p>{this.state.error}</p> : null}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        {this.state.success ? <h1>password successfully changed</h1> : null}
      </div>
    );
  }
}
export default connect(null, { ChangeforgotPassword })(
  withRouter(ForgotPasswordChange)
);

import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { changePhoneNo } from "../redux/actions/userActions";
import { Link, withRouter, Redirect } from "react-router-dom";
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const ChangePhoneNumber = Yup.object().shape({
  password: Yup.string().required("Required"),
  newPhoneNo: Yup.string()
  .matches(phoneRegExp, "Phone number is not valid")
  .required("Required"),
});

class ChangePhoneNoPage extends Component {
  state = {
    error: "",
    success: false,
  };
  handleSubmit = async (data) => {
    const { password, newPhoneNo} = data;
    const obj = { password, newPhoneNo};
    const resp = await this.props.changePhoneNo(obj);
    console.log(this.props.user);
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
        {!this.props.user ? (
          <Redirect to="/user/login" />
        ) : (
          <>
            <h1>Change Phone Nummber</h1>
            <Formik
              initialValues={{
                newPhoneNo: "",
              }}
              validationSchema={ChangePhoneNumber}
              onSubmit={this.handleSubmit}
            >
              {({ errors, touched }) => (
                <Form style={{ display: "flex", flexDirection: "column" }}>
                  <h3>password</h3>
                  <Field name="password" type="password" />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <h3>New Phone Number</h3>
                  <Field name="newPhoneNo" type="Number" />
                  {errors.newPhoneNo && touched.newPhoneNo ? (
                    <div>{errors.newPhoneNo}</div>
                  ) : null}
                  <br />
                  {this.state.error ? <p>{this.state.error}</p> : null}

                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
            {this.state.success ? (
              <h1>Phone number successfully changed Redirecting to login</h1>
            ) : null}
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.userState.user,
});
export default connect(mapStateToProps, { changePhoneNo })(
  withRouter(ChangePhoneNoPage)
);

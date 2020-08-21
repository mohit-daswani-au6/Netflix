import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/changePassword.css"
import { connect } from "react-redux";
import { ChangePassword } from "../redux/actions/userActions";
import { Link, withRouter, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";
import NetflixNav from "../components/NetflixNav";
import { Button } from "reactstrap";
import Footer from "../components/Footer";
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
    const extrastyle={
      position: "absolute",
      bottom: "0px",
      width: "100%",
    }
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    return (
      <div>
      <NetflixNav color="black" />

          {!user?<Redirect to="/user/login"/>:
          <div className="cardForChange">
        <h1>Change password</h1>
        <br/>
        <br/>
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
              <Field style={{background:"white",fontSize: "18px", padding: "10px"}} placeholder="Current password" name="oldpassword" type="password" />
              {errors.oldpassword && touched.oldpassword ? (
                <p>{errors.oldpassword}</p>
              ) : <br/>}
              
              <Field style={{background:"white",fontSize: "18px", padding: "10px"}} placeholder="New password (8-32 characters)" name="password" type="password" />
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : <br/>}
              <Field style={{background:"white",fontSize: "18px", padding: "10px"}} placeholder="Confirm new password" name="cpassword" type="password" />
              {errors.cpassword && touched.cpassword ? (
                <p>{errors.cpassword}</p>
              ) : <br/>}
              <br />
              {this.state.error ? <p>{this.state.error}</p> : null}

              <Button color="primary" type="submit">Save</Button>
            </Form>
          )}
        </Formik>
        {this.state.success ? <h1>password successfully changed Redirecting to login</h1> : null}
        </div>}
        <Footer
          extrastyle={extrastyle}
        />
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

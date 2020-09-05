import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/changePassword.css"
import { connect } from "react-redux";
import { ChangePassword } from "../redux/actions/userActions";
import {  withRouter, Redirect } from "react-router-dom";
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
      localStorage.setItem("user", JSON.stringify(resp));
      console.log(this.state.success);
      setTimeout(() => {
        this.props.history.push("/yourAccount");
      }, 2000);
    }
    setTimeout(() => {
      this.setState({ error: "" });
    }, 5000);
  };

  render() {
    const extrastyle = {
      margin: "-60px 0px",
      padding: "60px",
      background: "whitesmoke",
      width: "100%",
    };
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
            <Form style={{width:"350px" , display: "flex", flexDirection: "column",color:"red" }}>
              <Field style={{background:"white",fontSize: "18px",color:"black", padding: "10px"}} placeholder="Current password" name="oldpassword" type="password" />
              {errors.oldpassword && touched.oldpassword ? (
                <p>{errors.oldpassword}</p>
              ) : <br/>}
              
              <Field style={{background:"white",fontSize: "18px",color:"black", padding: "10px"}} placeholder="New password (8-32 characters)" name="password" type="password" />
              {errors.password && touched.password ? (
                <p>{errors.password}</p>
              ) : <br/>}
              <Field style={{background:"white",fontSize: "18px",color:"black", padding: "10px"}} placeholder="Confirm new password" name="cpassword" type="password" />
              {errors.cpassword && touched.cpassword ? (
                <p>{errors.cpassword}</p>
              ) : <br/>}
              <br />
              {this.state.error ? <p>{this.state.error}</p> : null}

              <div style={{display:"flex", justifyContent:"space-evenly"}}>
                  <Button style={{width:"100px"}} size="lg" color="primary" type="submit">
                    Save
                  </Button>
                  <Button style={{width:"100px"}} size="lg" onClick={() => this.props.history.goBack()}>back</Button>
                </div>            </Form>
          )}
        </Formik>
        {this.state.success ? <h5>Password changed successfully...</h5> : null}
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

import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/changePassword.css";
import { connect } from "react-redux";
import { changePhoneNo } from "../redux/actions/userActions";
import { withRouter, Redirect } from "react-router-dom";
import NetflixNav from "../components/NetflixNav";
import { Button } from "reactstrap";
import Footer from "../components/Footer";
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
    const { password, newPhoneNo } = data;
    const obj = { password, newPhoneNo };
    const resp = await this.props.changePhoneNo(obj);
    console.log(this.props.user);
    console.log(resp);
    if (resp.status === "failed") {
      this.setState({ error: resp.error });
    } else if (resp.statusCode === 201) {
      localStorage.setItem("user", JSON.stringify(resp));
      this.setState({ success: true });
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
      margin: "0px",
      padding: "60px",
      background: "whitesmoke",
      width: "100%",
    };
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    return (
      <div>
        <NetflixNav color="black" />
        {!user ? (
          <Redirect to="/user/login" />
        ) : (
          <div className="cardForChange">
            <h1>Change Phone Number</h1>
            <br />
            <br />
            <Formik
              initialValues={{
                password: "",
                newPhoneNo: "",
              }}
              validationSchema={ChangePhoneNumber}
              onSubmit={this.handleSubmit}
            >
              {({ errors, touched }) => (
                <Form style={{width:"350px", display: "flex", flexDirection: "column",color:"red" }}>
                  <Field
                    style={{
                      background: "white",
                      fontSize: "18px",
                      color:"black",
                      padding: "10px",
                    }}
                    placeholder="Password"
                    name="password"
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : (
                    <br />
                  )}
                  <Field
                    style={{
                      background: "white",
                      fontSize: "18px",
                      color:"black",
                      padding: "10px",
                    }}
                    placeholder="Phone number"
                    name="newPhoneNo"
                    type="Number"
                  />
                  {errors.newPhoneNo && touched.newPhoneNo ? (
                    <div>{errors.newPhoneNo}</div>
                  ) : (
                    <br />
                  )}
                  <br />
                  {this.state.error ? <p>{this.state.error}</p> : null}

                  <div style={{display:"flex", justifyContent:"space-evenly"}}>
                  <Button style={{width:"100px"}} size="lg" color="primary" type="submit">
                    Save
                  </Button>
                  <Button style={{width:"100px"}} size="lg" onClick={() => this.props.history.goBack()}>back</Button>
                </div>
                </Form>
              )}
            </Formik>
            {this.state.success ? (
              <h5>Phone number successfully changed...</h5>
            ) : null}
          </div>
        )}
        <Footer extrastyle={extrastyle} />
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

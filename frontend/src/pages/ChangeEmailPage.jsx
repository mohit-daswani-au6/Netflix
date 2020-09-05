import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../styles/changePassword.css";
import { connect } from "react-redux";
import { changeEmail } from "../redux/actions/userActions";
import { withRouter, Redirect } from "react-router-dom";
import NetflixNav from "../components/NetflixNav";
import { Button } from "reactstrap";
import Footer from "../components/Footer";

const ChangePhoneNumber = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const ChangeEmailPage = ({ changeEmail, history }) => {
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState();
  const handleSubmit = async (data) => {
    const { password, email } = data;
    const obj = { password, email };
    const resp = await changeEmail(obj);
    console.log(user);
    console.log(resp);
    if (resp.status === "failed") {
      seterror(resp.error);
      setTimeout(() => {
        seterror("");
      }, 5000);
    } else if (resp.statusCode === 201) {
      localStorage.setItem("user", JSON.stringify(resp));
      setsuccess(true);
      console.log(success);
      setTimeout(() => {
        history.push("/yourAccount");
      }, 2000);
    }
  };
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
          <h1>Change Email</h1>
          <br />
          <br />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={ChangePhoneNumber}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form
                style={{
                  width: "350px",
                  display: "flex",
                  flexDirection: "column",
                  color: "red",
                }}
              >
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
                  placeholder="Email"
                  name="email"
                  type="email"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : (
                  <br />
                )}
                <br />
                {error ? <p>{error}</p> : null}
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Button
                    style={{ width: "100px" }}
                    size="lg"
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button
                    style={{ width: "100px" }}
                    size="lg"
                    onClick={() => history.goBack()}
                  >
                    back
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          {success ? <h5>Email successfully changed...</h5> : null}
        </div>
      )}
      <Footer extrastyle={extrastyle} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.userState.user,
});
export default connect(mapStateToProps, { changeEmail })(
  withRouter(ChangeEmailPage)
);

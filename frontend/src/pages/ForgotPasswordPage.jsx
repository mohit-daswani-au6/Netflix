import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { forgotPasswordLink } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

class ForgotPasswordPage extends Component {
  state = {
    error: "",
    success:false
  };
  handleSubmit = async (data) => {
    
    const resp = await this.props.forgotPasswordLink(data);
    console.log(resp);
    if (resp.statusCode === 403) {
      console.log(resp.error);
      this.setState({ error: resp.error });
    } else if (resp.statusCode === 200) {
        this.setState({success:true})
      // this.props.history
    }
    setTimeout(() => {
      this.setState({ error: "" });
    }, 3000);
    // this.props.history.push("/");
  };

  render() {
    return (
      <div>
              <NavBar/>
        <h1>Forgot Password?</h1>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <h3>email</h3>
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}            
              <br />
              {this.state.error ? <p>{this.state.error}</p> : null}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        {this.state.success?<h1>Email Sent Successfully</h1>:null}

      </div>
    );
  }
}
export default connect(null, { forgotPasswordLink })(ForgotPasswordPage);

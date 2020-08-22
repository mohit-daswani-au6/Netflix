import React, { Component } from "react";
import SubscriptionPlanCard from "../components/SubscriptionPlanCard";
import { Container, CardDeck } from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getSubscription } from "../redux/actions/subscriptionAction";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
class SubscriptionPlanPage extends Component {
  state = {
    items: [
      {
        type: "Monthly",
        price: 99,
        details: "No recurring Charges . Non-refundable . No free trial",
        features: "Unlimited Movies",
      },
      {
        type: "Annually",
        price: 499,
        details: "No recurring Charges . Non-refundable . No free trial",
        features: "Unlimited Movies",
      },
    ],
  };
  handleClick = async (e) => {
    e.preventDefault();
    if (e.target.value === "Annually") {
      const response = await this.props.getSubscription(this.state.items[1]);
      this.props.history.push(`/razorpay/${response.order.order_id}`)
    }
    else{
      const response = await this.props.getSubscription(this.state.items[0]);
      this.props.history.push(`/razorpay/${response.order.order_id}`)
    }
  };
  render() {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    const extrastyle={
      margin: "0px",
      marginTop:"65px",
      padding: " 0 100px",
      background: "#e5e5e5"
    }
    return (
      <div>
      {user?
      <>
      <NavBar/>
      <Container style={{ textAlign: "center", marginTop: "70px" }}>
        <h1>Plans & Pricing</h1>
        <br />
        <CardDeck>
          {this.state.items.map((item) => (
            <SubscriptionPlanCard handleClick={this.handleClick} item={item} />
          ))}
        </CardDeck>
      </Container>
      <Footer extrastyle={extrastyle}/>
      </>
      :<Redirect to="/user/login"/>}

      </div>
    );
  }
}

export default connect(null, { getSubscription })(
  withRouter(SubscriptionPlanPage)
);

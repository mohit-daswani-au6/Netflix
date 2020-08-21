import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { razorpaySuccess } from "../redux/actions/subscriptionAction";
import { withRouter } from "react-router-dom";
import { Button, Container } from "reactstrap";
import NavBar from "../components/NavBar";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

const RazorpayPage = ({ razorpaySuccess, match, history }) => {
  const [OrderId, setOrderId] = useState();
  useEffect(() => {
    const data = async () => {
      const { orderId } = match.params;
      setOrderId(orderId);
    };
    data();
  }, []);
  const userJSON = localStorage.getItem("user");
  const { user } = JSON.parse(userJSON);
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    var options = {
      name: "Netflix",
      description: "Test Transaction",
      image:
        "https://www.citypng.com/public/uploads/preview/-11594683197dyw1e3i6bz.png",
      order_id: OrderId,
      handler: async function (response) {
        const res = await razorpaySuccess(response);
        console.log(res);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phoneNo,
      },
      theme: {
        color: "#111",
      },
    };
    var paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };
  return (
    <>
      <NavBar />
      <Container
        style={{ marginTop: "70px", textAlign: "center", width: "285px" }}
      >
        {user ? (
          <>
            <p>
              STEP <b>2</b> OF <b>2</b>
            </p>
            <h2> Set up your payment.</h2>
            <br />
            <br />
            <p style={{ fontSize: "20px" }}>
              Your membership starts as soon as you set up payment
            </p>
            <br />

            <p>
              <b>No commitments.</b>
              <br />
              <b>Cancel online anytime</b>
            </p>

            <Button color="success" onClick={displayRazorpay}>
              Process Payment
            </Button>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </Container>
    </>
  );
};
// const mapStateToProps = (state) => ({
//   user: state.userState.user,
// });

export default connect(null, { razorpaySuccess })(withRouter(RazorpayPage));

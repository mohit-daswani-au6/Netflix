import Axios from "axios"


import React from 'react'

const RazorpayPage = () => {
    const paymentHandler = async (e) => {
        const API_URL = "http://localhost:5555/"
        e.preventDefault();
        const orderUrl = `${API_URL}user/subscription`;
        const response = await Axios.get(orderUrl);
        const { data } = response;
        const options = {
          key:"rzp_test_zyXHel11nhN5Jc",
          name: "Netflix1",
          description: "Some Description",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `${API_URL}capture/${paymentId}`;
             const captureResponse = await Axios.post(url, {})
             console.log(captureResponse.data);
            } catch (err) {
              console.log(err);
            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        };
    return (
        <div>
          <button onClick={paymentHandler}>Pay Now</button>  
        </div>
    )
}

export default RazorpayPage


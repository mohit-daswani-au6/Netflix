const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors=require('cors')
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 20,
 
});
app.use( apiLimiter);
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(
    cors()
);

const userRoute = require('./Routes/userRoute')
const adminRoute = require("./Routes/adminRoute")
const movieRoute = require("./Routes/moviesRoute")
const subscriptionRoute=require("./Routes/SubscriptionRoute")

app.use(userRoute)
app.use(adminRoute)
app.use(movieRoute)
app.use(subscriptionRoute)


app.post("/capture/:paymentId", (req, res) => {
    try {
      return request(
       {
       method: "POST",
       url: `https://${config.RAZOR_PAY_KEY_ID}:${config.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
       form: {
          amount: 10 * 100, // amount == Rs 10 // Same As Order amount
          currency: "INR",
        },
      },
     async function (err, response, body) {
       if (err) {
        return res.status(500).json({
           message: "Something Went Wrong",
         }); 
       }
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
        return res.status(200).json(body);
      });
    } catch (err) {
        console.log(err)
      return res.status(500).json({
        message: "Something Went Wrong",
     });
    }
  });

dotenv.config()
require("./db")
module.exports = app
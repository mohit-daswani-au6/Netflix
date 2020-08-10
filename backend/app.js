const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const morgan = require('morgan')
const cors=require('cors')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const userRoute = require('./Routes/userRoute')
const adminRoute = require("./Routes/adminRoute")
// const rateLimit = require("express-rate-limit");
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 20
// });
// app.use( apiLimiter);
app.use(
    cors({
        origin:"*",         
        allowedHeaders: ["Content-Type","Authorization"],
        credentials: true
    })
);

app.use(userRoute)
app.use(adminRoute)



dotenv.config()
require("./db")
app.use(morgan('dev'))

module.exports = app
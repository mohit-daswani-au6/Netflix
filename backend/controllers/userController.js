const users = require("../models/user");
const email1 = require("../utils/nodeMailer");
const { verify } = require("jsonwebtoken");
const {hash}=require("bcryptjs")
const { validationResult } = require("express-validator");
module.exports = {
  get: {
    // ----------------------email verification----------
    async verify_user_email(req, res) {
      try {
        let temp = req.params.token;
        console.log(temp);
        let user1 = await users.find_user_by_token(temp);
        console.log(user1);
        res.send("email verified");
      } catch (err) {
        console.log(err, "sdfsd");
        res.status(500).send("server error");
      }
    },
  },
  post: {
    //--------------------------------------------------------login user logic
    async login_user(req, res) {
      try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).send("Incorrect Credentials1");
        const user = await users.find_by_email_and_password(email, password);
        if (user.verified_email === false) {
          return res.json({ message: "Please verify your email first" });
        } else {
          const accesToken = await user.generateToken();
          res.status(201).json({
            statusCode: 201,
            token: accesToken,
            user
          });
        }
      } catch (err) {
        if (err.message == "Invalid Credentials")
          return res.send({ statusCode: 400, error: "Invalid Credentials" });
        return res.send("ServerError");
      }
    },
    //--------------------------------------------------------register user logic
    async register_user(req, res) {
      {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        try {
          let user = req.body;
          const { email, password, name, phoneNo } = user;
          if (!email || !password || !name || !phoneNo)
            return res.status(400).send("ValidationError");
          const NewUser = await users.create(user);
          NewUser.resetToken = null;
          token = await NewUser.generateToken();
          let subject = `Welcome to Netflix`;
          let html = `<h2>Thanks for Joining Us</h2>
                        <h3>Dear ${name} you are one step closer to become one of our prestigious family</h3>
                        <p>To verify your email Click <a href=http://localhost:5555/user/verify/${token} >here</a></p>
                        <p>http://localhost:5555/user/verify/${token}</p>           
                                  <p>Thank you!!!!</p>`;

          email1(email, subject, html); //////////////////////function to send email to the user
          res.status(201).json({ statusCode: 201, NewUser });
        } catch (err) {
          if (err.code === 11000) {
            if (err.keyValue.hasOwnProperty("email")) {
              return res.json({ error: { email: `Email already occupied` } });
            }
            if (err.keyValue.hasOwnProperty("phoneNo")) {
              return res.json({
                error: { phoneNo: `Phone Number already registered` },
              });
            }
          }
          if (err.name === "ValidationError")
            return res.status(400).send(`Validation Error: ${err.message}`);
          console.log(err);
          return res.status(500).send("Server Error");
        }
      }
    },
    //----------------------------------------------------------------------user forgot password logic
    async forgot_password(req, res) {
      try {
        let { email } = req.body;
        console.log(req.body);
        const user = await users.find_by_email(email);
        console.log(user);
        if (user.length != 0) {
          if (user[0].verified === false) {
            return res.json({
              statusCode: "403",
              error: "please verify your email first",
            });
          } else {
            const resetToken = await users.generate_reset_token(user);
            let subject = `Password Reset`;
            let html = `<h2>Netflix</h2>
                           <h3>Dear ${user[0].name}, Seems like you forgot your password for Netflix account. if this is true, click below to reset your password.</h3>
                           <button style="background-color: #338DFF; /* blue */
                           border: none;
                           color: white;
                           text-align: center;
                           text-decoration: none;
                           display: inline-block;
                           font-size: 16px;
                           margin: 4px 2px;
                           cursor: pointer;"><a href=http://localhost:3000/user/forgot_password/${resetToken}>Reset My Password</a></button>
                           <p>copy paste this link to your browser:- http://localhost:3000/user/forgot_password/${resetToken}</p> 
                           <p style="color:red;">If you did not forgot your password you can safely ignore this email.</p>
                           <p>Thank you</p>`;
            email1(user[0].email, subject, html);
            res.status(200).json({
              statusCode: 200,
              message: `We have send a reset password email to ${user[0].email}. Please click the reset password link to set a new password.`,
            });
          }
        } else
          return res.json({ statusCode: 403, error: "email ID not found" });
      } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
      }
    },
  },

  put: {
    async forgot_password(req, res) {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { resetToken } = req.params;
      const { newpassword, cpassword } = req.body;
      if (newpassword !== cpassword)
        return res.send({ statusCode: 400, error: "Password doesn't match" });
      try {
        const decoded = await verify(resetToken, process.env.secretkey);
        if (decoded) {
          const user = await users.find({ resetToken: resetToken });
          user[0].password = newpassword;
          user[0].save();
          res.send({
            statusCode: 201,
            message: "password successfully changed",
          });
        }
      } catch (err) {
        console.log(err.message);
        if (err.message === "jwt expired")
          return res.send({ statusCode: 400, error: "session expired" });
        res.send("serverError");
      }
    },
    async ChangePassword(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      try {
        const user = req.user;
        const { oldpassword, newpassword, cpassword } = req.body;
        const password = await users.findByPassword(user, oldpassword);

        if (password === "Invalid Credentials") {
          res.json({ status: "failed", error: "Bad request" });
        } else {
          if (newpassword === cpassword) {            
            const hashedpassword = await hash(newpassword, 10);
            const resetPassword = await users.updateOne(
              { token: user.token },
              { password: hashedpassword },
              { new: true }
            );
            res.status(200).json({ statusCode: 201, message: "password changed successfully" });
          } else {
            res.json({ status: "failed", error: "Password doesn't match" });
          }
        }
      } catch (err) {
        console.log(err);
        if(err.message==="Invalid old password") return res.json({status:"failed",error:err.message})
        
        res.status(500).send({ status: "failed", error: "Server Error" });
      }
    },
  },
  //-------------------------------------------------------------------------------start of delete request
  delete1: {
    //------------------------------------------------------------------------user logout logic
    async logout_user(req, res) {
      try {
        const token = req.header("Authorization");
        const user = await users.nullifyToken(token);
        res.json({status:201,user});
      } catch (err) {
        console.log(err);
        res.status(500).send("server error");
      }
    },
    //----------------------------------------------------------------------------end
  },
};

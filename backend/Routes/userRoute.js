const users = require("../models/user");
const { sign } = require("jsonwebtoken");
const { get, post, put, delete1 } = require("../controllers/userController");
const { Router } = require("express");
const router = Router();
const authentication = require("../middlewares/authentication");
const { check } = require("express-validator");




const passport=require('passport')
const { Strategy: FacebookStrategy } = require("passport-facebook");
router.use(passport.initialize())
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
passport.serializeUser((user,done)=>{
    console.log(user)
    done(null,user.id)
})
//facebook middleware
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_API,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `http://localhost:3000/facebook/redirect`,
  profileFields: ['id', 'displayName', 'photos', 'email']
},
(accessToken, refreshToken,response, profile,done)=>{
  console.log("accesstoken",accessToken)
  console.log("refresh",refreshToken)
  console.log("profile",profile)
  console.log(response)
  //checking if user already exits or not
  users.findOne({facebookid:profile.id}).then(currentuser=>{
      if(currentuser){ 
          done(null,currentuser)
      }else{
          let token = async ()=>{
              SECRET_KEY = `${profile.displayName}-${new Date(users.createdAt).getTime()}`
              const token1 = await sign({ id: profile.id }, SECRET_KEY, {
                  expiresIn: "1d"
              })
              new users({
                  name:profile.displayName,
                  facebookid:profile.id,
                  token:await token1,
                  email:profile.id,
                  password:'null',
                  phoneNo:profile.id,
                  resetToken:accessToken,
                  verified_email:true,
                  isthirdparty:true,
              }).save().then((currentuser)=>{
              done(null,currentuser)
              })
          }
          token()
      }
  })
}
));

router.get("/facebook",passport.authenticate("facebook"));
 //facebook redirect route
 router.get("/facebook/redirect",
 passport.authenticate("facebook",
 {
   successRedirect:CLIENT_HOME_PAGE_URL,
     failureRedirect: "http://localhost:3000/user/register"
   }
),
(req,res)=>{
  res.send({
    user:req.user
  })    
});












//-------------------------------------------------------Get Request Route
router.get("/user/verify/:token", get.verify_user_email);
//-------------------------------------------------------Post Request Route

router.post(
  "/user/register",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Must be at least 3 chars long"),
    check("email").isEmail(),
    check("password")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage("Must have symbol lowercase uppercase and number")
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 chars long"),
    check("phoneNo").isLength(10).withMessage("Invalid phone number"),
  ],
  post.register_user
);
router.post("/user/login", post.login_user);
router.post("/user/forgot_password", post.forgot_password);
//-------------------------------------------------------Put Request Route
router.put(
  "/user/forgot_password/:resetToken",
  [
    check("newpassword")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage("Must have symbol lowercase uppercase and number")
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 chars long"),
  ],
  put.forgot_password
);
router.put(
  "/user/changePassword",
  authentication,
  [
    check("newpassword")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage("Must have symbol lowercase uppercase and number")
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 chars long"),
  ],
  put.ChangePassword
);
router.put(
  "/user/changePhoneNumber",
  authentication,
  [
    check("newPhoneNo")
      .isLength(10)
      .withMessage("Invalid phone number"),
  ],
  put.ChangePhoneNumber
);
router.put(
  "/user/changeEmail",
  authentication,
  [
    check("email").isEmail().withMessage("Invalid Email")
  ],
  put.ChangeEmail
);
//-------------------------------------------------------Delete Request Route
router.delete("/user/logout", delete1.logout_user);

module.exports = router;

const admins = require("../models/admin");
const movieSchema = require("../models/movies");
const AWSsignedUrl = require("../utils/awsFileUpload");

module.exports = {
  post: {
    // -------------------------------admin login---------------
    async login_admin(req, res) {
      try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).send("Incorrect Credentials");
        const admin = await admins.check_email_and_password(email, password);
        const accesToken = await admin.generate_admin_Token();
        res.status(201).json({
          statusCode: 201,
          token: accesToken,
        });
      } catch (err) {
        console.log(err.message);
        if (err.message == "Invalid Credentials")
          return res.status(400).send("Invalid Credentials");
        return res.send("ServerError");
      }
    },
    // -------------------products added by admin
    async add_movie(req, res) {
      try {
        console.log("uploadinig started")
        const posterImage = await AWSsignedUrl(req.files.posterImage[0]);
        const backgroundImage = await AWSsignedUrl(
          req.files.backgroundImage[0]
        );
        const movie = await AWSsignedUrl(req.files.movie[0]);
        const genre = await JSON.parse(req.body.genre)
        const obj={
          posterImage,
          movie,
          backgroundImage,
          ...req.body,
          genre,
          
        }
        console.log(obj)
        const newMovie = await movieSchema.create(obj);
        console.log(newMovie);
        await newMovie.save();
        res.json({statusCode:201,newMovie});
      } catch (err) {
        console.log(err);
        res.send("serverError");
      }
    },
  }, // -----------------------admin logout--------------
  delete1: {
    async logout_admin(req, res) {
      try {
        token = req.header("Authorization");
        const admin = await admins.nullify_admin_Token(token);
        res.json(admin);
      } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
      }
    },
  },
};

const admins = require("../models/admin");
const movie = require("../models/movies");
const FormData = require("form-data");
// const formidable = require("formidable")
// const s3fs=require("s3fs")
// const s3fsimpl = new s3fs("mynetflixclone1",{
//   accessKeyId: "AKIAJRJ4DPHV6547VGQA",
//   secretAccessKey: "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",
//   signatureVersion: "v4",
//   apiVersion: "2006-03-01",
//   region: "ap-south-1",
// })
// s3fsimpl.create()
// const {getVideoDurationInSeconds}= require("get-video-duration")
const fs = require("fs");
const axios = require("axios");
const AWSsignedUrl = require("../utils/awsFileUpload");
//requiring cloudinary
// const cloudinary = require('../utils/cloudinary')
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
      // try {
      //   let temp1 = req.body;
      //   console.log(req.body)
      //     console.log(req.files)
      //     AWSsignedUrl(req.files[0])
      //     let img_url = [];
      //     const adminToken = req.header("Authorization");
      //     const admin = await admins.find({ token: adminToken });
      //     if (admin) {
      //       fs.readdir("uploads/", (err, data) => {
      //         if (err) {
      //           throw err;
      //         }
      //         let temp = data;
      //         img_url.length = 0;
      //       });

      //     } else res.send("Kindly login first");
      //   } catch (err) {
      //     if (err == MongoError) return res.send("stylecode should be unique");
      //     console.log(err);
      //     return res.send("serverError");
      //   }
      // },
      try {
        console.log("DSaada", req.files);
        console.log(req.body);
        //  console.log(JSON.stringify(req.body.posterImage))
        const url = await AWSsignedUrl(req.files[0]);
        const options = {
          headers: {
            "Content-Type": req.files[0].mimetype,
          }
        };
        console.log(req.files[0])
        const result2 = await axios.put(url, {data:req.files[0]}, options);
        console.log("ssss", result2);
      } catch (err) {
        console.log(err);
      }
    },
  }, // -----------------------admin logout--------------
  delete1: {
    async logout_admin(req, res) {
      try {
        token = req.params.adminToken;
        const admin = await admins.nullify_admin_Token(token);
        res.json(admin);
      } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
      }
    },
  },
};

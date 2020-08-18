const AWS = require("aws-sdk");
const fs = require("fs");
const { AWSAccesskey, AWSPassword, AWSDomain } = process.env;
const AWSSignedUrl = async (file) => {
  try {
    const { mimetype, originalname, buffer, fieldname } = file;
    let s3bucket = new AWS.S3({
      accessKeyId: AWSAccesskey,
      secretAccessKey: AWSPassword,
      signatureVersion: "v4",
      apiVersion: "2006-03-01",
      region: "ap-south-1",
    });
    var params = {
      Bucket: "mynetflixclone",
      Key: `${fieldname}/${originalname}`,
      Body: buffer,
      ContentType: mimetype,
      ACL: "public-read",
    };
    await s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {

        const filelink = `${AWSDomain}/${data.Key}`;
        console.log(filelink)
      }
    });
    return  `${AWSDomain}/${params.Key}`
  } catch (err) {
    console.log(err);
  }
};
module.exports = AWSSignedUrl;

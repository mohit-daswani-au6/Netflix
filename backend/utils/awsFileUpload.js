const AWS = require("aws-sdk");
const fs = require("fs");

const AWSSignedUrl = async (file) => {
  try {
    const { mimetype, originalname, buffer, fieldname } = file;
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWSAccesskey,
      secretAccessKey: process.env.AWSPassword,
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
    const url=[]
    await s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const filelink = `${proccess.env.AWSDomain}/${data.Key}`;
url.push(filelink)
      }
    });
    console.log("Dsaadas",url)
    return url[0];
  } catch (err){
    console.log(err);
  }
};
module.exports = AWSSignedUrl;

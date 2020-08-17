const AWS = require("aws-sdk");
const fs = require("fs");

const AWSSignedUrl = async (file) => {
  try {
    const { mimetype, originalname, buffer, fieldname } = file;
    const s3FileURL = "https://mynetflixclone1.s3.ap-south-1.amazonaws.com/";

    let s3bucket = new AWS.S3({
      accessKeyId: "AKIAJRJ4DPHV6547VGQA",
      secretAccessKey: "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",
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
        const filelink = `d117rg3wqcjkx9.cloudfront.net/${data.Key}`;
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

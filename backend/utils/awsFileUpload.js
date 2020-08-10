const AWS = require("aws-sdk");
const fs=require("fs")

const AWSSignedUrl =async (file) => {
  try {
    const { mimetype, purpose, originalname } = file;
    const fileurls = [];
    const filename="uploads/file4Sbv3.png"
    console.log("ADasdas",file)
    // const filec =await fs.readFileSync(filename)
    // console.log("AfdssfsdfDasdas",filec)
    const signedUrlExpireSeconds = 60 * 60 * 10;
    const params = {
      Bucket: "mynetflixclone",
      Key: `movie/${originalname}`,
      Expires: signedUrlExpireSeconds,
      ACL: "public-read",
      ContentType: mimetype,
      // Body :JSON.stringify(filec, null, 2)
    };
  //  await  s3.upload(params, function(err, data) {
  //     console.log("PRINT FILE:", file);
  //     if (err) {
  //         console.log('ERROR MSG: ', err);
  //     } else {
  //         console.log('Successfully uploaded data',data);
  //     }
  // });
    await s3.getSignedUrl("putObject", params, function (err, url) {
      if (err) {
        console.log("Error getting presigned url from AWS S3");
      } else {
        fileurls[0] = url;
        console.log("Presigned URL: ", fileurls[0]);
      }
    });
    
    console.log("dasda",fileurls[0])
    return fileurls[0];
  } catch (err) {
    console.log(err);
  }
};
module.exports = AWSSignedUrl;

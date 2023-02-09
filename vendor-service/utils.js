// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "MyAwesomeKey";

const TABLE_NAME = "Vendor";
const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");


// const getToken = async (user, expiry) => {
//   return jwt.sign(user, SECRET_KEY, {
//     expiresIn: expiry,
//   });
// };
// const verifyUser = async (req) => {
//   //   const SECRET_KEY = "MyAwesomeKey";
//   let token = req.headers["Authorization"];
//   if (token) {
//     jwt.verify(token, SECRET_KEY, function (err, decoded) {
//       if (err) {
//         console.log(err);
//       } else {
//         req.decoded = decoded;
//         console.log("all good");
//       }
//     });
//   } else {
//     console.log("mmmm");
//   }
// };

const sendEmail = async(to,subject,content) =>{

  try {
    
 
    // configure AWS SDK
    AWS.config.update({
      accessKeyId: "AKIA5YLWMZDY2UPJ4J7U",
      secretAccessKey: "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",
      region: "us-east-1",
    });
    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: "2010-12-01",
      }),
    });

    // send some mail
    const result = await transporter.sendMail({
      from: "verification@localtraders.finance",
      to: to,
      subject: subject,
      html: content   });

    return result
  } catch (error) {
    console.log("### email error ###",error)
    return false
  }

}



const send = (statusCode, data) => {
  const responseHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    'Access-Control-Allow-Methods': '*'
  };

  return {
    statusCode,
    headers: responseHeaders,
    body: JSON.stringify(data, null, 2),
  };
};

module.exports = {
  // getToken,
  // verifyUser,
  send,
  sendEmail,
  TABLE_NAME
};

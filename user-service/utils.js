// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "MyAwesomeKey";

const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const fs = require("fs");

async function validateRequestBody(allowedFields, body) {
  // Check if any fields other than the allowed fields are present

  const extraFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field)
  );
  if (extraFields.length > 0) {
    throw new Error(`Only ${allowedFields.join(", ")} fields are allowed`);
  }

  // Check if all allowed fields are present
  const missingFields = allowedFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `${missingFields.join(", ")} are required field`
    );
  }
}
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

const assets = [
  { symbol: "btc", assetName: "Bitcoin", balance: 0 },
  { symbol: "eth", assetName: "Ethereum", balance: 0 },
  { symbol: "bnb", assetName: "Binance Coin", balance: 0 },
  { symbol: "tet", assetName: "Tether", balance: 0 },
  { symbol: "lct", assetName: "LOCAL TRADERS", balance: 0 },
  { symbol: "usdc", assetName: "USD COIN", balance: 0 },
  { symbol: "busd", assetName: "Binance USD", balance: 0 },
];

const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Dave",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Isaac",
  "Jack",
  "Kathy",
  "Liam",
  "Molly",
  "Nate",
  "Olivia",
  "Peter",
  "Quinn",
  "Rachel",
  "Sam",
  "Tara",
  "Ursula",
  "Victoria",
  "Wendy",
  "Xander",
  "Yara",
  "Zack",
];

// Define a function to generate a random first name
async function generateRandomName() {
  const numDigits = 2;
  let name = [];
  for (let i = 0; i < numDigits; i++) {
    const randomIndex = Math.floor(Math.random() * firstNames.length); // Choose a random index from the firstNames array
    name.push(firstNames[randomIndex]); // Append the chosen first name to the name string
  }
  return name;
}

const sendVerifyEmail = async (to, subject, host) => {
  try {
    // configure AWS SDK
    AWS.config.update({
      accessKeyId: "AKIA5YLWMZDY2UPJ4J7U",
      secretAccessKey: "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",
      region: "us-east-2",
    });
    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: "2010-12-01",
      }),
    });

    const LogoIcon = "https://www.localtraders.finance/verify-email-assets/localtrader.png";
    const AppleStoreIcon = "https://www.localtraders.finance/verify-email-assets/applestore.png";
    const GooglePlayIcon = "https://www.localtraders.finance/verify-email-assets/googleplay.png";
    const TwitterIcon = "https://www.localtraders.finance/verify-email-assets/twitter.png";
    const YouTubeIcon = "https://www.localtraders.finance/verify-email-assets/youtube.png";
    const TelegramIcon = "https://www.localtraders.finance/verify-email-assets/telegram.png";
    const LinkedInIcon = "https://www.localtraders.finance/verify-email-assets/linkdin.png";
    const InstaIcon = "https://www.localtraders.finance/verify-email-assets/insta.png";
    const MpiaIcon = "https://www.localtraders.finance/verify-email-assets/mpaia.png";
    const CoinGeckoIcon = "https://www.localtraders.finance/verify-email-assets/coingecko.png";

    // send some mail
    const result = await transporter.sendMail({
      from: "verification@localtraders.finance",
      to: to,
      subject: subject,
      html:  `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="index.css" />
          <title>EmailTemplate</title>
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;1,700&display=swap");
      
            * {
              padding: 0;
              margin: 0;
              box-sizing: border-box;
            }
      
            .header {
              width: 60%;
              margin: auto;
              border-bottom: 2px solid #1b1773;
              background: #f2f2f2;
              display: flex;
            }
            .header-wrapper {
              padding: 5px 15px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .logo-div {
              width: 30%;
              margin-top: 10px
            }
            .empty-div {
              width: 40%;
              height: 50px;
            }
            .logo-div img {
              width: 200px;
              cursor: pointer;
            }
            .playstore-link {
              text-align: right;
              font-family: "Poppins", sans-serif;
              font-weight: 400;
              color: #827e7e;
              font-size: 13px;
              width: 30%;
            }
            .image-div {
              display: flex;
              justify-content: space-between;
              width: 100%;
            }
            .image-div img {
              width: 48%;
              cursor: pointer;
            }
            .coming-soon {
              width: 100%;
            }
            .verify-email {
              text-align: center;
              font-family: "Poppins", sans-serif;
              font-weight: 400;
              font-size: 16px;
              padding-top: 10px;
              padding-bottom: 10px;
            }
            .welcome-div {
              margin-top: 10px;
              margin-bottom: 10px;
            }
            .usethiscode {
              margin-top: 20px;
            }
            .verify-email a {
              background: #13b78c;
              color: #ffffff;
              font-size: 18px;
              font-family: "Poppins", sans-serif;
              font-weight: 500;
              border: none;
              cursor: pointer;
              padding: 5px 15px;
              text-decoration: none;
            }
            .happy-trading {
              border-top: 2px solid #908c8c;
              border-bottom: 2px solid #908c8c;
              text-align: center;
              font-family: "Poppins", sans-serif;
              font-weight: 400;
              font-size: 15px;
              color: #908c8c;
              padding-top: 20px;
              padding-bottom: 20px;
              width: 60%;
              margin: auto;
            }
            .happy {
              font-weight: 600;
              font-size: 18px;
            }
            .happy-section {
              display: flex !important;
              margin: auto;
              width:200px;
            }
            .happy-section a {
              background: #6339c9;
              color: #ffffff;
              border: none;
              padding: 5px 15px;
              font-size: 16px;
              font-family: "Poppins", sans-serif;
              margin-top: 5px;
              cursor: pointer;
              display: block;
              text-decoration: none;
            }
            .follow-us {
              width: 60%;
              margin: auto;
              font-family: "Poppins";
              color: #908c8c;
              font-size: 16px;
              padding: 20px;
            }
            .img-div {
              margin-top: 15px;
            }
            .img-div img {
              width: 23px;
              cursor: pointer;
              margin-right: 5px;
            }
          </style>
        </head>
        <body>
          <header class="header">
            <div style="display:flex; width: 100%;" class="header-wrapper">
              <div class="logo-div">
                <img src="${LogoIcon}" />
              </div>
              <div class="empty-div"> </div>
              <div style="" class="playstore-link">
                <p>available on app , google pay store</p>
                <div class="image-div">
                  <img src="${AppleStoreIcon}" />
                  <img src="${GooglePlayIcon}" />
                </div>
                <p class="coming-soon">coming soon</p>
              </div>
            </div>
          </header>
          <section class="verify-email">
            <p>Hi there!</p>
            <p class="welcome-div">
              Welcome to Local Tradersl! Ready to experience all the benefits of
              <br />being financially independent? Before you head off to the
              races,<br />
              make sure to verify your email address using the code below:
            </p>
            <a target="_blank" href="${host}">Verify email</a>
            <p class="usethiscode">
              Use this code on the website or Local Traders mobile app to<br />
              confirm your email address.Alternatively, you can verify your email<br />
              by clicking Verify email below:
            </p>
          </section>
          <section class="happy-trading">
            <p>
              Once verified, you can read more about securing your account on our
              <br />knowledge base resources and set up two-factor authentication
              (2FA) for an<br />
              added layer of security.<br />
              If you didn't try to verify your email, then ignore this message.
            </p>
            <div class="happy-section">
            <a href="#">
              <span class="happy">Happy trading,</span><br />Your friends at LCT
            </a>
          </div>
          </section>
          <section class="follow-us">
            <p>Follow us for more financial peace of mind</p>
            <div class="img-div">
              <img src="${TwitterIcon}" />
              <img src="${YouTubeIcon}" />
              <img src="${TelegramIcon}" />
              <img src="${LinkedInIcon}" />
              <img src="${InstaIcon}" />
              <img src="${MpiaIcon}" />
              <img src="${CoinGeckoIcon}" />
            </div>
          </section>
        </body>
      </html> 
      `,
    });

    return result;
  } catch (error) {
    console.log("### email error ###", error);
    return false;
  }
};

const sendEmail = async (to, subject, content) => {
  try {
    // configure AWS SDK
    AWS.config.update({
      accessKeyId: "AKIA5YLWMZDY2UPJ4J7U",
      secretAccessKey: "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",
      region: "us-east-2",
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
      html: content,
    });

    return result;
  } catch (error) {
    console.log("### email error ###", error);
    return false;
  }
};

const sendEmailToAdmin = async (from, content) => {
  try {
    // configure AWS SDK
    AWS.config.update({
      accessKeyId: "AKIA5YLWMZDY2UPJ4J7U",
      secretAccessKey: "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",
      region: "us-east-2",
    });
    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: "2010-12-01",
      }),
    });

    // send some mail
    const result = await transporter.sendMail({
      from: from,
      to: "verification@localtraders.finance",
      subject: "Request for Information",
      html: content,
    });

    return result;
  } catch (error) {
    console.log("### email error ###", error);
    return false;
  }
};

const thanksGivingEmailTemplate = `<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Localtraders</title>

    <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap");

        * {
            box-sizing: border-box;
            margin: 0;
        }

        body {
            font-family: "Poppins", sans-serif;
        }

        img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%;
        }

        body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%;
        }

        table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top;
        }

        .body {
            background-color: #f6f6f6;
            width: 100%;
        }

        .container {
            display: block;
            margin: 0 auto !important;
            max-width: 580px;
            padding: 10px;
            width: 580px;
        }

        .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px;
        }

        .main {
            background: #fff;
            border-radius: 3px;
            width: 100%;
        }

        .wrapper {
            box-sizing: border-box;
            padding: 20px;
        }

        .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
        }

        .footer {
            clear: both;
            margin-top: 10px;
            text-align: center;
            width: 100%;
        }

        .footer td,
        .footer p,
        .footer span,
        .footer a {
            color: #999;
            font-size: 12px;
            text-align: center;
        }

        h1,
        h2,
        h3,
        h4 {
            color: #000;
            font-family: sans-serif;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            margin-bottom: 30px;
        }

        h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize;
        }

        p,
        ul,
        ol {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            margin-bottom: 15px;
        }

        p li,
        ul li,
        ol li {
            list-style-position: inside;
            margin-left: 5px;
        }

        a {
            color: #3498db;
            text-decoration: underline;
        }

        .btn {
            box-sizing: border-box;
            width: 100%;
        }

        .btn>tbody>tr>td {
            padding-bottom: 15px;
        }

        .btn table {
            width: auto;
        }

        .btn table td {
            background-color: #fff;
            border-radius: 5px;
            text-align: center;
        }

        .btn a {
            background-color: #fff;
            border: solid 1px #3498db;
            border-radius: 5px;
            box-sizing: border-box;
            color: #3498db;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            padding: 12px 25px;
            text-decoration: none;
            text-transform: capitalize;
        }

        .btn-primary table td {
            background-color: #3498db;
        }

        .btn-primary a {
            background-color: #3498db;
            border-color: #3498db;
            color: #fff;
        }

        .last {
            margin-bottom: 0;
        }

        .first {
            margin-top: 0;
        }

        .align-center {
            text-align: center;
        }

        .align-right {
            text-align: right;
        }

        .align-left {
            text-align: left;
        }

        .clear {
            clear: both;
        }

        .mt0 {
            margin-top: 0;
        }

        .mb0 {
            margin-bottom: 0;
        }

        .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0;
        }

        .powered-by a {
            text-decoration: none;
        }

        hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            margin: 20px 0;
        }

        @media only screen and (max-width: 620px) {
            table[class="body"] h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important;
            }

            table[class="body"] p,
            table[class="body"] ul,
            table[class="body"] ol,
            table[class="body"] td,
            table[class="body"] span,
            table[class="body"] a {
                font-size: 16px !important;
            }

            table[class="body"] .wrapper,
            table[class="body"] .article {
                padding: 10px !important;
            }

            table[class="body"] .content {
                padding: 0 !important;
            }

            table[class="body"] .container {
                padding: 0 !important;
                width: 100% !important;
            }

            table[class="body"] .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
            }

            table[class="body"] .btn table {
                width: 100% !important;
            }

            table[class="body"] .btn a {
                width: 100% !important;
            }

            table[class="body"] .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important;
            }
        }

        @media all {
            .ExternalClass {
                width: 100%;
            }

            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height: 100%;
            }

            .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
            }

            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
            }

            .btn-primary table td:hover {
                background-color: #34495e !important;
            }

            .btn-primary a:hover {
                background-color: #34495e !important;
                border-color: #34495e !important;
            }
        }
    </style>
</head>

<body class="">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
            <td>&nbsp;</td>
            <td class="container">
                <div class="content">
                    <table role="presentation" class="main">
                        <tr>
                            <td class="wrapper">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>
                                            <p>Hi there,</p>
                                            <p>
                                                Thank you for submitting your query. We have received your message and
                                                will get back to you as soon as possible. Our team is currently working
                                                on resolving your issue or answering your question, and we appreciate
                                                your patience while we do so. If you have any additional information or
                                                details you'd like to share, please don't hesitate to let us know.
                                            </p>
                                            <p>Thank you!</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <div class="footer">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">

                            <tr>
                                <td class="content-block powered-by">
                                    Powered by <a href="https://www.localtraders.finance/"
                                        target="_blank">Localtraders</a>.
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </td>
            <td>&nbsp;</td>
        </tr>
    </table>
</body>

</html>`;

const emailTemplateWithMessage = (
  firstName,
  lastName,
  email,
  phoneNumber,
  message
) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Localtraders</title>
  
      <style>
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap");
  
          * {
              box-sizing: border-box;
              margin: 0;
          }
  
          body {
              font-family: "Poppins", sans-serif;
          }
  
          img {
              border: none;
              -ms-interpolation-mode: bicubic;
              max-width: 100%;
          }
  
          body {
              background-color: #f6f6f6;
              font-family: sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 14px;
              line-height: 1.4;
              margin: 0;
              padding: 0;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
          }
  
          table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%;
          }
  
          table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top;
          }
  
          .body {
              background-color: #f6f6f6;
              width: 100%;
          }
  
          .container {
              display: block;
              margin: 0 auto !important;
              max-width: 580px;
              padding: 10px;
              width: 580px;
          }
  
          .content {
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 580px;
              padding: 10px;
          }
  
          .main {
              background: #fff;
              border-radius: 3px;
              width: 100%;
          }
  
          .wrapper {
              box-sizing: border-box;
              padding: 20px;
          }
  
          .content-block {
              padding-bottom: 10px;
              padding-top: 10px;
          }
  
          .footer {
              clear: both;
              margin-top: 10px;
              text-align: center;
              width: 100%;
          }
  
          .footer td,
          .footer p,
          .footer span,
          .footer a {
              color: #999;
              font-size: 12px;
              text-align: center;
          }
  
          h1,
          h2,
          h3,
          h4 {
              color: #000;
              font-family: sans-serif;
              font-weight: 400;
              line-height: 1.4;
              margin: 0;
              margin-bottom: 30px;
          }
  
          h1 {
              font-size: 35px;
              font-weight: 300;
              text-align: center;
              text-transform: capitalize;
          }
  
          p,
          ul,
          ol {
              font-family: sans-serif;
              font-size: 14px;
              font-weight: normal;
              margin: 0;
              margin-bottom: 15px;
          }
  
          p li,
          ul li,
          ol li {
              list-style-position: inside;
              margin-left: 5px;
          }
  
          a {
              color: #3498db;
              text-decoration: underline;
          }
  
          .btn {
              box-sizing: border-box;
              width: 100%;
          }
  
          .btn>tbody>tr>td {
              padding-bottom: 15px;
          }
  
          .btn table {
              width: auto;
          }
  
          .btn table td {
              background-color: #fff;
              border-radius: 5px;
              text-align: center;
          }
  
          .btn a {
              background-color: #fff;
              border: solid 1px #3498db;
              border-radius: 5px;
              box-sizing: border-box;
              color: #3498db;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 12px 25px;
              text-decoration: none;
              text-transform: capitalize;
          }
  
          .btn-primary table td {
              background-color: #3498db;
          }
  
          .btn-primary a {
              background-color: #3498db;
              border-color: #3498db;
              color: #fff;
          }
  
          .last {
              margin-bottom: 0;
          }
  
          .first {
              margin-top: 0;
          }
  
          .align-center {
              text-align: center;
          }
  
          .align-right {
              text-align: right;
          }
  
          .align-left {
              text-align: left;
          }
  
          .clear {
              clear: both;
          }
  
          .mt0 {
              margin-top: 0;
          }
  
          .mb0 {
              margin-bottom: 0;
          }
  
          .preheader {
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0;
          }
  
          .powered-by a {
              text-decoration: none;
          }
  
          hr {
              border: 0;
              border-bottom: 1px solid #f6f6f6;
              margin: 20px 0;
          }
  
          @media only screen and (max-width: 620px) {
              table[class="body"] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important;
              }
  
              table[class="body"] p,
              table[class="body"] ul,
              table[class="body"] ol,
              table[class="body"] td,
              table[class="body"] span,
              table[class="body"] a {
                  font-size: 16px !important;
              }
  
              table[class="body"] .wrapper,
              table[class="body"] .article {
                  padding: 10px !important;
              }
  
              table[class="body"] .content {
                  padding: 0 !important;
              }
  
              table[class="body"] .container {
                  padding: 0 !important;
                  width: 100% !important;
              }
  
              table[class="body"] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important;
              }
  
              table[class="body"] .btn table {
                  width: 100% !important;
              }
  
              table[class="body"] .btn a {
                  width: 100% !important;
              }
  
              table[class="body"] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important;
              }
          }
  
          @media all {
              .ExternalClass {
                  width: 100%;
              }
  
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                  line-height: 100%;
              }
  
              .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important;
              }
  
              #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                  font-size: inherit;
                  font-family: inherit;
                  font-weight: inherit;
                  line-height: inherit;
              }
  
              .btn-primary table td:hover {
                  background-color: #34495e !important;
              }
  
              .btn-primary a:hover {
                  background-color: #34495e !important;
                  border-color: #34495e !important;
              }
          }
      </style>
  </head>
  
  <body class="">
  
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
              <td>&nbsp;</td>
              <td class="container">
                  <div class="content">
                      <table role="presentation" class="main">
                          <tr>
                              <td class="wrapper">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                          <td>
                                              <p>Name  : ${firstName} ${lastName}</p>
                                              <p>Email : ${email}</p>
                                              <p>Query : </p>
                                              <p>${message}</p>
                                              <p>
                                                  Thank you for submitting your query.
                                              </p>
                                              <p>Phone Number: ${phoneNumber}</p>
                                             
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                      <div class="footer">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
  
                              <tr>
                                  <td class="content-block powered-by">
                                      Powered by <a href="https://www.localtraders.finance/"
                                          target="_blank">Localtraders</a>.
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </div>
              </td>
              <td>&nbsp;</td>
          </tr>
      </table>
  </body>
  
  </html>`;
};
const send = (statusCode, data) => {
  const responseHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "*",
  };

  return {
    statusCode,
    headers: responseHeaders,
    body: JSON.stringify(data, null, 2),
  };
};

async function validatePassword(password) {
  const requiredChars = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    specialChar: /[@$!%*?&]/,
    numerical: /[0-9]/,
  };

  for (const [charType, regex] of Object.entries(requiredChars)) {
    if (!regex.test(password)) {
      throw new Error(
        `Password must contain at least one ${charType} character.`
      );
    }
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  return true;
}

async function validateRequestBody(allowedFields, body) {
  // Check if any fields other than the allowed fields are present

  const extraFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field)
  );
  if (extraFields.length > 0) {
    throw new Error(`Only ${allowedFields.join(", ")} fields are allowed`);
  }

  // Check if all allowed fields are present
  const missingFields = allowedFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `${missingFields.join(", ")} are required field`
    );
  }
}
const initalizeWallet = async (userId) => {
  try {
    // check if this userId already have the wallet
    const walletParams = {
      TableName: "Wallet",
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const isWalletAlreadyExists = await dynamoDbClient
      .scan(walletParams)
      .promise();
    if (isWalletAlreadyExists.Items.length) {
      throw new Error("user already have the wallet");
    }

    // create wallet for userId

    const walletId =
      "wid-" + Date.now() + Math.random().toString(36).substring(2, 15);
    const walletData = {
      walletId: walletId,
      userId,
      isWalletActive: false,
    };

    const params = {
      TableName: "Wallet",
      Item: walletData,
    };

    const walletResponse = await dynamoDbClient.put(params).promise();
    return walletResponse;
  } catch (err) {
    throw new Error(err);
  }
};

async function createAssetsForUser(userId) {
  try {
    // Create assets for userId
    const promises = assets.map((asset) => {
      const id = Date.now() + Math.random().toString(36).substring(2, 15);
      const assetData = {
        assetId: id,
        userId,
        balance: asset.balance,
        assetName: asset.assetName,
        symbol: asset.symbol,
        address: "",
      };

      const params = {
        TableName: "Asset",
        Item: assetData,
      };

      return dynamoDbClient.put(params).promise();
    });

    await Promise.all(promises);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  // getToken,
  // verifyUser,
  send,
  sendEmail,
  initalizeWallet,
  createAssetsForUser,
  sendVerifyEmail,
  thanksGivingEmailTemplate,
  emailTemplateWithMessage,
  sendEmailToAdmin,
  validatePassword,
  generateRandomName,
  validateRequestBody,
};

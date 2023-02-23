// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "MyAwesomeKey";

const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const fs = require('fs');
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

const sendVerifyEmail = async (to, subject, host) => {
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

    let hero = fs.readFileSync('./images/hero.png');
    let app = fs.readFileSync('./images/app.png');
    let circleM = fs.readFileSync('./images/circleM.png');
    let coingecko = fs.readFileSync('./images/coingecko.png');
    let google = fs.readFileSync('./images/google.png');
    let heroSection = fs.readFileSync('./images/hero-section.png');
    let intagram = fs.readFileSync('./images/intagram.png');
    let linkedin = fs.readFileSync('./images/linkedin.png');
    let logoTraders = fs.readFileSync('./images/logo-traders.png');
    let medium = fs.readFileSync('./images/medium.png');
    let telegram = fs.readFileSync('./images/telegram.png');
    let twitter = fs.readFileSync('./images/twitter.png');
    let youtube = fs.readFileSync('./images/youtube.png');



    // send some mail
    const result = await transporter.sendMail({
      from: "verification@localtraders.finance",
      to: to,
      subject: subject,
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email</title>
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap");
            * {
              box-sizing: border-box;
              margin: 0;
            }
            body {
              font-family: "Poppins", sans-serif;
            }
            
            img{
              object-fit: contain;
            }
      
            .hero {
              width: 100%;
            }
            .column-1,
            .column-2 {
              float: left;
              width: 50%;
            }
            .column-2 {
              display: grid;
              justify-content: center;
              margin-top: 9%;
            }
            .row:after {
              content: "";
              display: table;
              clear: both;
            }
            .logo {
              margin-bottom: 50px;

              width: 300px;
              margin-top: 50px;
              margin-bottom: 10px;
            }
            .description {
              font-family: "Poppins", "Google Sans";
              font-style: normal;
              font-weight: 400;
              font-size: 20px;
              color: #827e7e;
              line-height: 40px;
            
            }
            .google,
            .app {
              margin-left: 10%;
              margin-left: 10px;
            }
            .google:hover,
            .app:hover {
              cursor: pointer;
              box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
            }
            .anouncement-text {
              font-style: normal;
              font-weight: 400;
              font-size: 17px;
              line-height: 18px;
              color: #c6c6c6;
              margin-left: 94px;
              font-family: "Poppins", "Google Sans";
            }
      
      
            .hero-hr {
              height: 2px;
              border-width: 2px;
              color: #827e7e;
              background-color: #827e7e;
              position: sticky;
              width: 100%;
              position: absolute;
              top: 468px;
            }
            /* Section -two */
      
      
            .verify-email-section {
              display: grid;
              width: 100%;
              text-align: center;
              justify-content: normal;
              font-family: "Poppins", "Google Sans";
            }
            .hello-text {
              font-style: normal;
              font-weight: 400;
              font-size: 20px;
              line-height: 80px;
              color: #000000;
              font-family: "poppins", "Google Sans";
            }
            .welcome-text {
              font-style: normal;
              font-weight: 400;
              font-size: 1.2rem;
              line-height: 30px;
              text-align: center;
              color: #000000;
              margin-bottom: 20px;
              font-family: "poppins", "Google Sans";
            }
            .verify-email-button {
              font-style: normal;
              font-weight: 400;
              width: 205px;
              height: 40px;
              background: #13b78c;
              border: #13b78c;
              font-size: 25px;
              color: #ffffff;
              margin: 30px auto;
              cursor: pointer;
              font-family: "poppins", "Google Sans";
              text-decoration: none;
              color: white !important;
              /* border: 1px solid red; */
              text-align: center !important;
      
            }
            .code-text {
              font-style: normal;
              font-weight: 400;
              font-size: 20px;
              line-height: 30px;
              text-align: center;
              max-width: 100%;
              color: #000000;
              margin-bottom: 20px;
              font-family: "poppins", "Google Sans";
            }
            .email-section-hr {
              height: 2px;
              border-width: 0;
              color: #827e7e;
              background-color: #827e7e;
              opacity: 0.5;
            }
            .security-section {
              display: grid;
            }
            .two-factor-text {
              font-style: normal;
              font-weight: 400;
              font-size: 1rem;
              line-height: 25px;
              text-align: center;
              color: #918c8c;
              margin: 3% 0;
            }
            .happy-trading-btn {
              width: 220px;
              height: 67px;
              background: #6339c9;
              border: #6339c9;
              color: #ffffff;
              font-style: normal;
              font-weight: 500;
              font-size: 16px;
              font-family: "poppins", "Google Sans";
              cursor: pointer;
              margin: 10px auto;
              padding: 10px 0;
            }
      
      
            .happy-trading-btn > p {
              font-family: "poppins", "Google Sans";
              font-weight: 200;
              font-size: 16px;
              line-height: 20px;
            }
            .security-section-hr {
              height: 2px;
              border-width: 0;
              color: #827e7e;
              background-color: #827e7e;
              opacity: 0.5;
              margin: 3% 0;
            }
            .footer-column-1,
            .footer-column-2 {
              float: left;
              width: 50%;
            }
            .follow-text {
              font-style: normal;
              font-weight: 400;
              font-size: 20px;
              line-height: 24px;
              color: #827e7e;
              margin-left: 7%;
            }
            .footer-description {
              font-style: normal;
              font-weight: 400;
              font-size: 15px;
              line-height: 20px;
              text-align: right;
              color: #c0c0c0;
              max-width: 400px;
              margin-left: 20%;
            }
            .icons-row {
              display: flex;
              flex-direction: row;
              margin-left: 5%;
              /* border: 1px solid red; */
            }
            .icons-row > img {
              margin: 10px 10px;
              height: 30px;
              width: 30px;
              cursor: pointer;
            }
      
      
            @media screen and (max-width: 600px) {
              .row {
                margin-top: 5%;
              }
              .hero {
                display: none;
              }
              .column-1,
              .column-2 {
                width: 100%;
              }
              .column-2 {
                margin-top: 0;
              }
              .logo {
                width: 300px;
              }
              .description {
                font-size: 15px;
                line-height: 25px;
                text-align: center;
              }
              .google,
              .app {
                width: 100px;
              }
              .hero-hr {
                transform: none;
                margin-top: 50px;
              }
              .verify-email-section {
                margin-top: 10%;
              }
              .hello-text {
                font-size: 1.5rem;
                line-height: 50px;
              }
              .welcome-text {
                font-size: 0.8rem;
                line-height: 20px;
                padding: 0 30px;
              }
              .verify-email-button {
                font-size: 20px;
                width: 130px;
                height: 40px;
                text-align: center;
                padding: 10px;
              }
              .anouncement-text{
                text-align: center;

              }
              .code-text {
                font-size: 0.8rem;
                line-height: 20px;
                padding: 0 20px;
              }
              .two-factor-text {
                font-size: 0.8rem;
                line-height: 20px;
                padding: 30px;
              }
              .happy-trading-btn {
                width: 150px;
                height: 50px;
                font-size: 15px;
              }
              .happy-trading-btn > p {
                font-size: 12px;
                line-height: 30px;
              }
              .follow-text {
                font-size: 12px;
                line-height: 20px;
              }
              .footer-description {
                font-size: 10px;
                line-height: 15px;
                margin-left: 0;
              }
              .icons-row > img {
                margin: 30px 5px;
                height: 15px;
                width: 15px;
              }
            }
          </style>
        </head>
        <body>
          <div class="row">
            <div class="column-1">
            <img 
                src="cid:unique@hero.ee" 
                alt="Hero"
                class="hero"
                title="hero-img"
                width="500px"
                height="500px"
            />  
    
            
            </div>
            <div class="column-2">
              <img
                src="cid:unique@logo-traders.ee"
                alt="Logo"
                class="logo"
                title="logo"
                height="100px"
                width="400px"
              />
              <p class="description">available on app , google play store</p>
              <div>
                <img
                 src="cid:unique@google.ee"
                  alt="Google"
                  class="google"
                  width="130px"
                  title="google-button"
                />
                <img
                 src="cid:unique@app.ee"
                  alt="App"
                  class="app"
                  width="130px"
                  title="app-button"
                />
              </div>
              <p class="anouncement-text">coming soon</p>
            </div>
          </div>
          <hr class="hero-hr" />
      
      
          <div class="verify-email-section">
            <p class="hello-text">Hi there!</p>
            <p class="welcome-text">
              Welcome to Local Tradersl! Ready to experience all the benefits of being
              financially <br />
              independent? Before you head off to the races, make sure to verify your
              email <br />
              address using the code below:
            </p>
            <a href="${host}" class="verify-email-button" target="_blank"
              >Verify Email</a
            >
            <p class="code-text">
              Use this code on the website or Local Traders mobile app to confirm your
              email <br />address.Alternatively, you can verify your email by clicking
              Verify email below:
            </p>
          </div>
          <hr class="email-section-hr" />
          <div class="security-section">
            <p class="two-factor-text">
              Once verified, you can read more about securing your account on our
              knowledge base <br />
              resources and set up two-factor authentication (2FA) for an added layer
              of security.<br />
              If you didn't try to verify your email, then ignore this message.
            </p>
            <button class="happy-trading-btn">
              Happy trading,
              <p>Your friends at LCT</p>
            </button>
          </div>
          <hr class="security-section-hr" />
          <footer>
            <div class="footer-section">
              <div class="row">
                <div class="footer-column-1">
                  <p class="follow-text">
                    Follow us for more financial peace of mind
                  </p>
                  <div class="icons-row">
                    <img
                      src="cid:unique@twitter.ee"
                      alt="Twitter"
                      class="twitter"
                      title="twitter"
                    />
                    <img
                     src="cid:unique@youtube.ee"
                      alt="youtube"
                      class="youtube"
                      title="youtube"
                    />
                    <img
                     src="cid:unique@telegram.ee"
                      alt="telegram"
                      class="telegram"
                      title="telegram"
                    />
                    <img
                     src="cid:unique@linkedin.ee"
                      alt="LinkedIn"
                      class="linkedin"
                      title="linkedin"
                    />
                    <img
                     src="cid:unique@intagram.ee"
                      alt="Instagram"
                      class="instagram"
                      title="intagram"
                    />
                    <img src="cid:unique@medium.ee" alt="Medium" class="medium" title="medium" />
                    <img src="cid:unique@circleM.ee" alt="M" class="m" title="circleImg" />
                    <img
                    src="cid:unique@coingecko.ee"
                      alt="coingecko"
                      class="coingecko"
                      title="coingecko"
                    />
                  </div>
                </div>
                <div class="footer-column-2">
                  <p class="footer-description">
                    You received this email because you have registered an account on
                    localtraders.finance
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>`,
      attachments: [
        {
          filename: "hero.png",
          content: hero,
          cid: "unique@hero.ee",
        },
        {
          filename: "app.png",
          content: app,
          cid: "unique@app.ee",
        },
        {
          filename: "circleM.png",
          content: circleM,
          cid: "unique@circleM.ee",
        },
        {
          filename: "coingecko.png",
          content: coingecko,
          cid: "unique@coingecko.ee",
        },
        {
          filename: "google.png",
          content: google,
          cid: "unique@google.ee",
        },
        {
          filename: "hero-section.png",
          content: heroSection,
          cid: "unique@heroSection.ee",
        },
        {
          filename: "intagram.png",
          content: intagram,
          cid: "unique@intagram.ee",
        },
        {
          filename: "linkedin.png",
          content: linkedin,
          cid: "unique@linkedin.ee",
        },
        {
          filename: "logo-traders.png",
          content: logoTraders,
          cid: "unique@logo-traders.ee",
        },
        {
          filename: "medium.png",
          content: medium,
          cid: "unique@medium.ee",
        },
        {
          filename: "telegram.png",
          content: telegram,
          cid: "unique@telegram.ee",
        },
        {
          filename: "twitter.png",
          content: twitter,
          cid: "unique@twitter.ee",
        },
        {
          filename: "youtube.png",
          content: youtube,
          cid: "unique@youtube.ee",
        },
      ],
    });

    return result;
  } catch (error) {
    console.log("### email error ###", error);
    return false;
  }
};



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

const sendEmailToAdmin = async(from,content) =>{

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
      from: from,
      to: "verification@localtraders.finance",
      subject: "Request for Information",
      html: content   });

    return result
  } catch (error) {
    console.log("### email error ###",error)
    return false
  }

}


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


const emailTemplateWithMessage = (firstName,lastName,email,phoneNumber,message) =>{

  return`<!DOCTYPE html>
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
  
  </html>`
}
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
  sendEmailToAdmin
};

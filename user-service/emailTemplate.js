const emailTemplate = async (host, btnText, message) => {
  const LogoIcon = "https://www.localtraders.finance/verify-email-assets/localtrader.svg";
  const AppleStoreIcon = "https://www.localtraders.finance/verify-email-assets/applestore.svg";
  const GooglePlayIcon = "https://www.localtraders.finance/verify-email-assets/googleplay.svg";
  const TwitterIcon = "https://www.localtraders.finance/verify-email-assets/twitter.svg";
  const YouTubeIcon = "https://www.localtraders.finance/verify-email-assets/youtube.svg";
  const TelegramIcon = "https://www.localtraders.finance/verify-email-assets/telegram.svg";
  const LinkedInIcon = "https://www.localtraders.finance/verify-email-assets/linkdin.svg";
  const InstaIcon = "https://www.localtraders.finance/verify-email-assets/insta.svg";
  const MpiaIcon = "https://www.localtraders.finance/verify-email-assets/mpaia.svg";
  const CoinGeckoIcon = "https://www.localtraders.finance/verify-email-assets/coingecko.svg";
  return `<!DOCTYPE html>
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
        }
        .header-wrapper {
          
          padding: 5px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo-div img {
          width: 200px;
          cursor: pointer;
        }
        .playstore-link {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-direction: column;
          text-align: right;
          font-family: "Poppins", sans-serif;
          font-weight: 400;
          color: #827e7e;
          font-size: 13px;
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
          align-items: center;
          display: flex;
          justify-content: center;
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
          width: 27%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 15px;
        }
        .img-div img {
          width: 23px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <header class="header">
        <div class="header-wrapper">
          <div class="logo-div">
            <img src="${LogoIcon}" />
          </div>
          <div class="playstore-link">
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
  
  
  `;
};
module.exports = { emailTemplate };

const emailTemplate = async (host, btnText, message) => { const googleImg =
  "https://www.localtraders.finance/Email-images/google.png"; const appImg =
  "https://www.localtraders.finance/Email-images/app.png"; const circleImg =
  "https://www.localtraders.finance/Email-images/circleM.png"; const coingeckoImg
  = "https://www.localtraders.finance/Email-images/coingecko.png"; const HeroImg =
  "https://www.localtraders.finance/Email-images/hero-section.png"; const instaImg
  = "https://www.localtraders.finance/Email-images/intagram.png"; const
  linkedinImg = "https://www.localtraders.finance/Email-images/linkedin.png";
  const LogoImg =
  "https://www.localtraders.finance/Email-images/logo-traders.png"; const MImg =
  "https://www.localtraders.finance/Email-images/medium.png "; const teleImg =
  "https://www.localtraders.finance/Email-images/telegram.png"; const twitterImg =
  "https://www.localtraders.finance/Email-images/twitter.png"; const youtubeImg =
  "https://www.localtraders.finance/Email-images/youtube.png"; return `<!DOCTYPE html>
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
        }
        .description {
          font-family: "Poppins", "Google Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          color: #827e7e;
          line-height: 40px;
          text-align: center;
        }
        .google,
        .app {
          margin-left: 10%;
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
          text-align: center;
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
            width: 150px;
            height: 50px;
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
            src="${HeroImg}"
            alt="Hero"
            class="hero"
            title="hero-img"
            width="500px"
            height="500px"
          />
        </div>
        <div class="column-2">
          <img
            src="${LogoImg}"
            alt="Logo"
            class="logo"
            title="logo"
            height="100px"
            width="400px"
          />
          <p class="description">available on app , google play store</p>
          <div>
            <img
              src="${googleImg}"
              alt="Google"
              class="google"
              width="130px"
              title="google-button"
            />
            <img
              src="${appImg}"
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
          >${btnText}</a
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
                  src="${twitterImg}"
                  alt="Twitter"
                  class="twitter"
                  title="twitter"
                />
                <img
                  src="${youtubeImg}"
                  alt="youtube"
                  class="youtube"
                  title="youtube"
                />
                <img
                  src="${teleImg}"
                  alt="telegram"
                  class="telegram"
                  title="telegram"
                />
                <img
                  src="${linkedinImg}"
                  alt="LinkedIn"
                  class="linkedin"
                  title="linkedin"
                />
                <img
                  src="${instaImg}"
                  alt="Instagram"
                  class="instagram"
                  title="intagram"
                />
                <img src="${MImg}" alt="Medium" class="medium" title="medium" />
                <img src="${circleImg}" alt="M" class="m" title="circleImg" />
                <img
                  src="${coingeckoImg}"
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
  </html>
  
  
  `; }; module.exports = { emailTemplate };
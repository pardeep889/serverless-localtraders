// const jwt = require("jsonwebtoken");
// const SECRET_KEY = "MyAwesomeKey";

const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();


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
};

const utils = require("./utils");
const AWS = require("aws-sdk");
const { decodeToken } = require("./token");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function createUser(data) {
  try {
    const id = "uid" + Date.now() + Math.random().toString(36).substring(2, 15);
    const timestamp = "" + Date.now();

    const userData = {
      ...data,
      id,
      timestamp,
      isEmailVerified: true,
    };
    // register user
    const params = {
      TableName: "User",
      Item: userData,
    };

    await dynamoDb.put(params).promise();
    return userData;
  } catch (error) {
    console.log({ error });
    throw new Error("something went wrong while register the user");
  }
}

module.exports.handler = async (request) => {
  let user;
  try {
    const { token } = request.pathParameters;
    if (!token) {
      return utils.send(400, {
        message: "Missing token path param",
        data: {},
      });
    }
    const tokenResponse = await decodeToken(token);
    console.log({ tokenResponse });

    if (!tokenResponse.isVerified) {
      return utils.send(400, {
        isVerified: tokenResponse.isVerified,
        error: "invalid token",
      });
    }

    // check if email already exists 

        const paramsScan = {
          TableName: "User",
          FilterExpression: "email = :email",
          ExpressionAttributeValues: {
            ":email": tokenResponse.data?.email,
          },
        };
    
        const data = await dynamoDb.scan(paramsScan).promise();
        if (data.Items.length > 0) {
          return utils.send(400, {
              message: "You already used this token ",
              isVerified: true,
          });
        }

    // register user
    const { password, ...userResp } = await createUser(tokenResponse.data);
    user = userResp;

    // wallet setup
    await utils.initalizeWallet(userResp.id);
    await utils.createAssetsForUser(userResp.id);

    return utils.send(200, {
      isVerified: tokenResponse.isVerified,
      data: userResp,
      isWalletSetup: true,
    });
  } catch (error) {
    if (error.toString().includes("user already have the wallet")) {
      return utils.send(200, {
        // message: "" + error,
        isVerified: true,
        isWalletSetup: false,
        data: user,
      });
    }

    return utils.send(400, {
      message: "Unable to verify email. something went wrong",
      error: error + "",
      isVerified: false,
      isWalletSetup: false,
    });
  }
};

const utils = require("./utils");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getUser = async (email) => {
  const params = {
    TableName: "User",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  const result = await dynamoDb.scan(params).promise();
  return result.Items[0];
};

const checkIfAssetExitsForSymbol = async (symbol, userId) => {
  console.log({ symbol, userId });
  // check if user exist in our db
  const paramsScan = {
    TableName: "Asset",
    FilterExpression: "symbol = :symbol and userId = :userId",
    ExpressionAttributeValues: {
      ":symbol": symbol,
      ":userId": userId,
    },
  };

  const data = await dynamoDb.scan(paramsScan).promise();
  console.log({ data });
  return data.Items[0];
};

module.exports.handler = async (request) => {
  try {
    if (!request.body) {
      return utils.send(400, {
        message: "request body is missing!",
      });
    }

    let funds;
    try {
      funds = JSON.parse(request.body);
    } catch (err) {
      return utils.send(400, {
        message: "request for add funds is not a valid JSON",
      });
    }

    if (!funds.email || !funds.symbol || !funds.amount) {
      return utils.send(400, {
        message: "missing email, symbol or amount the body",
      });
    }

    let { symbol, amount, email } = funds;
    const symbol_lowerCase = symbol.toLowerCase();

    // check if user exits
    const user = await getUser(email);
    console.log("### user ####", user);
    if (!user) {
      return utils.send(404, {
        message: "user with this email does not exist",
      });
    }

    // check if symbol exits for this user
    const asset = await checkIfAssetExitsForSymbol(symbol_lowerCase, user.id);
    console.log("#### asset ###", asset);

    if (!asset) {
      return utils.send(404, {
        message: `user with email ${email} does not have this ${symbol}`,
      });
    }
    //   update balance for request symbol

    await dynamoDb
      .update({
        TableName: "Asset",
        Key: { assetId: asset?.assetId },
        UpdateExpression: "set #balance = :balance",
        ExpressionAttributeValues: {
          ":balance": amount,
        },
        ExpressionAttributeNames: {
          "#balance": "balance",
        },
      })
      .promise();

    // add entry to funds table

    const id = Date.now() + Math.random().toString(36).substring(2, 15);
    const added_on = "" + Date.now();

    const fundsData = {
      id,
      recipient_id: user.id,
      recipient_email : user?.email,
      recipient_name :  user?.firstname +" "+ user?.lastname,
      amount,
      symbol: symbol_lowerCase,
      added_on,
    };

    const params = {
      TableName: "Add-Funds",
      Item: fundsData,
    };

    await dynamoDb.put(params).promise();
    return utils.send(200, {
      message: "funds add successfuly",
    });
  } catch (error) {
    return utils.send(400, {
      message: "Unable to add funds. something went wrong",
      error,
    });
  }
};

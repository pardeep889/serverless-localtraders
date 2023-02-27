const utils = require("./utils");
const { verifyUser } = require("./token");
const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

async function Withdrawal(data) {
  try {


    const id = "wid" + Date.now() + Math.random().toString(36).substring(2, 15);
    const timestamp = "" + Date.now();

    const dataForWtihDrawal= {
      id,
      ...data,
      timestamp
    };
    // register user
    const params = {
      TableName: "WithDrawal",
      Item: dataForWtihDrawal,
    };

    await dynamoDbClient.put(params).promise();
    return dataForWtihDrawal;
  } catch (error) {
    console.log({ error });
    throw new Error("something went wrong while register the kyc request");
  }
}


module.exports.handler = async (request) => {

    if (!request.body) {
      return utils.send(400, {
        message: "request body is missing!",
      });
    }
  
    let body;
    try {
      body = JSON.parse(request.body);
    } catch (err) {
      return utils.send(400, {
        message: "request body is not a valid JSON",
      });
    }
  
    try {
      const requiredFields = ["userId","amount","symbolType"]
      await utils.validateRequestBody(requiredFields, body);
    } catch (error) {
      return utils.send(400, {
        message: error.toString().slice(6).trim(),
      });
    }

    try {
      const isVerified = await verifyUser(request);
      if (isVerified.statusCode === 401) {
        return {
          statusCode: 401,
          body: JSON.stringify({
            isVerified: false,
            error: "Access Forbidden",
          }),
        };
      }
      
      let {userId,amount,symbolType } = body;
      const symbol_lowerCase = symbolType?.toLowerCase()

      // first check if userId exist with respective to symbolType 
      
    const assetResp = await utils.retrieveAssetBalance(userId, symbol_lowerCase);
    console.log("sender rr##### ", { assetResp });

    if (!assetResp) {
      return utils.send(404, {
        message: `user not found with respective ${symbol_lowerCase} symbol`,
      });
    }

    if (parseFloat(assetResp?.balance) < amount) {
      return utils.send(400, {
        message: "user doesn't have sufficient balance to withdrawal",
      });
    }

    const updated_balance = parseFloat(assetResp?.balance) - amount;
    // update balance for asset
    await utils.updateBalance(assetResp.assetId, updated_balance);
    
      // add entry to kyc table
    const withDrawalData = {
      userId,
      amount,
      symbol :symbol_lowerCase
    };

   const resp =  await Withdrawal(withDrawalData)
   // create transaction 
   await utils.createTransaction(userId, userId, amount, symbol_lowerCase, "withdrawal");

    return utils.send(200, {
      message: "withdrawal successfully.",
      data: resp
    });
  } catch (error) {
    return utils.send(400, {
      message: "Unable to withdrawal amount. something went wrong",
      error: error + "",
    });
  }
};

const utils = require("./utils");
const { verifyUser } = require("./token");

module.exports.handler = async (request) => {
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
        message: "request for add body is not a valid JSON",
      });
    }

    if (!body.symbol || !body.timePeroidInMonths || !body.stakeAmount || !body.userId) {
      return utils.send(400, {
        message: "missing symbol, userId,timePeroidInMonths or stakeAmount the body",
      });
    }

    let { timePeroidInMonths, stakeAmount, symbol, userId } = body;

    const assetResponse = await utils.retrieveAssetBalance(
      userId,
      symbol
    );
    console.log("assetResponse rr##### ", { assetResponse });

    if (!assetResponse) {
      return utils.send(400, {
        message: ` user doesn't exists or  doesn't have ${symbol} symbol`,
      });
    }

    if (parseFloat(assetResponse?.balance) < +stakeAmount) {
      return utils.send(400, {
        message: "user with this asset doesn't have sufficient balance to add in stake",
      });
    }

    // create stack
    await utils.createStack(userId,symbol,stakeAmount,parseFloat(timePeroidInMonths))

    const updated_balance_of_asset =
      parseFloat(assetResponse?.balance) - (+stakeAmount);
    console.log({ updated_balance_of_asset });

    // update balance of asset 

    await utils.updateBalance(assetResponse.assetId, updated_balance_of_asset);

    // create transactions
    await utils.createTransaction(userId, userId, stakeAmount, symbol, "stake");

    return utils.send(200, {
      message: "balance added in stack successfuly",
    });
  } catch (error) {
    return utils.send(400, {
      message: "Unable to add amount in stack. something went wrong",
      error: error + "",
    });
  }
};

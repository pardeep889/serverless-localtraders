const utils = require("./utils");
const { verifyUser } = require("./token");

module.exports.handler = async (request) => {
  try {

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

    if (!body.stakeAmount || !body.userId || !body.unlockedDate || !body.txnId || !body.tokenAmount || !body.status) {
      return utils.send(400, {
        message: "missing stakeAmount, userId, unlockedDate , status, tokenAmountor txnId the body",
      });
    }

    let { unlockedDate, stakeAmount, userId ,tokenAmount , txnId, status} = body;

    const symObject = {
      tokenAmount: tokenAmount,
      txnId: txnId,
      unlockedDate: unlockedDate
    }
    // const assetResponse = await utils.retrieveAssetBalance(
    //   userId,
    //   symbol
    // );
    // console.log("assetResponse rr##### ", { assetResponse });

    // if (!assetResponse) {
    //   return utils.send(400, {
    //     message: ` user doesn't exists or  doesn't have ${symbol} symbol`,
    //   });
    // }

    // if (parseFloat(assetResponse?.balance) < +stakeAmount) {
    //   return utils.send(400, {
    //     message: "user with this asset doesn't have sufficient balance to add in stake",
    //   });
    // }

    // // create stack
    // await utils.createStack(userId,symbol,stakeAmount,parseFloat(timePeroidInMonths))

    // const updated_balance_of_asset =
    //   parseFloat(assetResponse?.balance) - (+stakeAmount);
    // console.log({ updated_balance_of_asset });

    // // update balance of asset 

    // await utils.updateBalance(assetResponse.assetId, updated_balance_of_asset);

    // create transactions
    await utils.createTransaction(userId, userId, stakeAmount, symObject, "stake", status);

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

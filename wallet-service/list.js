const utils = require("./utils");

module.exports.handler = async (event) => {
	const {userId} = event.pathParameters;

	if (!userId) {
    return utils.send(400, {
      message: 'The path parameter "userId" is required.'
    });
  }
	
	try{
		const response = {
			data: [
				{
					"userId": userId,
					"walletId": "my wallet",
					"walletId": `wallet1.near`,
					"bloackChainStatus": "completed",
					"status": "active",
					"balance": "$ 100",
					"walletHash": "jhfgdcvhjkljkhggfhdfxchvjklnmbvhjfgjbhgfdcvbbmvfh"
				},
				{
					"userId": userId,
					"walletId": "near wallet",
					"walletId": `wallet2.near`,
					"bloackChainStatus": "completed",
					"status": "inactive",
					"balance": "$ 100",
					"walletHash": "sdgbsghfjdxghftjrgfnxbbhvjklnmbvhjfgjbhgfdcvbbmvfh"
				},
				{
					"userId": userId,
					"walletId": "cryoto wallet",
					"walletId": `wallet3.near`,
					"bloackChainStatus": "completed",
					"status": "archived",
					"balance": "$ 0",
					"walletHash": "jhfgdcqawgssafgshdrdfbzgaewhrbsbvhjfgjbhgfdcvbbmvfh"
				}
			]
		};

		return utils.send(200, {
			message: 'wallets retrieved successfully',
			body: response,
		});

	}catch(err){
		return utils.send(500, {
			message: "Internal Server Error",
			body: err
		});
	}
};
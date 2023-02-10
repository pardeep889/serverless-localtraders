const utils = require("./utils");

module.exports.handler = async (event) => {
	const {walletId} = event.pathParameters;

	if (!walletId) {
    return utils.send(400, {
      message: 'The path parameter "walletId" is required.'
    });
  }

	try{
		const response = {
			data: {
				"userId": "V1StGXR8_Z65dHi6B-myT",
				"walletId": walletId,
				"walletId": `${walletId}.near`,
				"bloackChainStatus": "completed",
				"status": "active",
				"balance": "$ 100",
				"walletHash": "jhfgdcvhjkljkhggfhdfxchvjklnmbvhjfgjbhgfdcvbbmvfh"
			}
		};

		return utils.send(200, {
			message: 'wallet retrieved successfully',
			body: response,
		});

	}catch(err){
		return utils.send(500, {
			message: "Internal Server Error",
			body: err
		});
	}
};

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
				"walletId": `${walletId}.near`,
				"status": "archived"
			}
		};

		return utils.send(200, {
			message: 'wallet archived successfully',
			body: response,
		});

	}catch(err){
		return utils.send(500, {
			message: "Internal Server Error",
			body: err
		});
	}
};

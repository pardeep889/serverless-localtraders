const utils = require("./utils");

module.exports.handler = async (event) => {
	const body = JSON.parse(event.body);

	try{
		const response = {
			data: {
				"walletName": body.walletName,
				"status": "active",
			}
		};

		return utils.send(200, {
			message: 'wallet created successfully',
			body: response,
		});

	}catch(err){
		return utils.send(500, {
			message: "Internal Server Error",
			body: err
		});
	}
};
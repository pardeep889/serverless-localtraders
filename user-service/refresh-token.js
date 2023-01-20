const utils = require("./utils");

module.exports.handler = async (request) => {
  let body = JSON.parse(request.body);
  const response = {
    message: "Request successful",
    data: body,
  };
  return utils.send(200, response);
};

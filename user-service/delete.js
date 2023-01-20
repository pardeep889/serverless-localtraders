const utils = require("./utils");

module.exports.handler = async (request) => {
  const { userId } = request.pathParameters;
  if (!userId) {

    return utils.send(400, {
      message: "Missing userId path param",
      data: {},
    });
  }
  const response = {
    message: "User updated successfully.",
    data: userId,
  };
  return utils.send(200, response);

};

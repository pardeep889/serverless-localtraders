const utils = require("./utils");

module.exports.handler = async (request) => {
  const USER = {
    firstName: "test",
    lastName: "user",
    walletId: "testuser.near",
    email: "mock-test@primelab.io",
    phone: "+2551817181",
    dob: "2000-10-10",
  };
  const { userId } = request.pathParameters;
  if (!userId) {
    return utils.send(400, {
      message: "Missing userId path param",
      data: {},
    });
  }
  const response = {
    message: "User updated successfully.",
    data: USER,
  };
  return utils.send(200, response);
};

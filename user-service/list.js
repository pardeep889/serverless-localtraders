const utils = require("./utils");

module.exports.handler = async (request) => {
  const USERS = [
    {
      firstName: "test",
      lastName: "user",
      walletId: "testuser.near",
      email: "mock-test@primelab.io",
      phone: "+2551817181",
      dob: "2000-10-10",
    },
    {
      firstName: "test",
      lastName: "user",
      walletId: "testuser.near",
      email: "mock-test@primelab.io",
      phone: "+2551817181",
      dob: "2000-10-10",
    },
    {
      firstName: "test",
      lastName: "user",
      walletId: "testuser.near",
      email: "mock-test@primelab.io",
      phone: "+2551817181",
      dob: "2000-10-10",
    },
  ];
  const response = {
    message: "Request successful",
    data: USERS,
  };
  return utils.send(200, response);
};

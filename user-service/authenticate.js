const utils = require("./utils");

module.exports.handler = async (request) => {
  let body;
  try {
    body = JSON.parse(request.body);
  } catch {
    return utils.send(400, {
      message: "Malformed body",
      data: body,
    });
  }
  const response = {
    message: "code send on email - code 222222",
    type: "email",
  };
  return utils.send(200,response);
};

const utils = require("./utils");
module.exports.handler = async (request) => {
  const TOKEN_EXPIRY_IN_MILLISECONDS = 3600;
  const USER = {
    firstName: "test",
    lastName: "user",
    walletId: "testuser.near",
    email: "mock-test@primelab.io",
    phone: "+2551817181",
    dob: "2000-10-10",
  };
  let body;
  try {
    body = JSON.parse(request.body);
  } catch {
    return utils.send(400, {
      message: "Malformed body",
      data: body,
    });
  }
  if (body.walletId && body.otp && body.otp == 222222) {
    let token = await utils.getToken(USER, TOKEN_EXPIRY_IN_MILLISECONDS);
    const response = {
      accessToken: token,
      idToken: token,
      refreshToken: token,
      expiry: Date.now() + TOKEN_EXPIRY_IN_MILLISECONDS,
      user: USER,
    };
    return utils.send(200, response);
  } else {
    return utils.send(401, {
      message: "OTP not provided, is invalid or expired",
    });
  }
};

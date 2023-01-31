const jwt = require("jsonwebtoken");
const SECRET_KEY = "MyAwesomeKey";

const getToken = async (user, expiry) =>  jwt.sign(
    {
      data: user,
    },
    SECRET_KEY,
    { expiresIn: expiry }
  );


const verifyUser = async (req) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    console.log("#### auth ####", token);
    if (token && token != undefined) {
      const resp = await jwt.verify(token, SECRET_KEY);
      console.log("#### resp #####", resp);

      return {
        statusCode: 200,
        body: JSON.stringify({ isVerified: true }),
      };
    }
    return {
        statusCode: 401,
        body: JSON.stringify({ isVerified: false }),
      };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ isVerified: false, error:error?.message }),
    };
  }
};

const send = (statusCode, data) => {
  const responseHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  return {
    statusCode,
    headers: responseHeaders,
    body: JSON.stringify(data, null, 2),
  };
};

module.exports = {
  getToken,
  verifyUser,
  send,
};

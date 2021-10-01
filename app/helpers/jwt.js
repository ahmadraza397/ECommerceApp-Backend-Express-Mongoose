const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/users/login", { url: /\/users/, method: ["POST"] }],
  });
}

module.exports = authJwt;

const expressJwt = require("express-jwt");
const config = require('../config/config.json');
const { secret } = config;

function loginFilter() {
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: [
      { url: "/products", method: "GET" },
      { url: "/users", method: "POST" },
      { url: "/carts", method: "GET"  },
      { url: "/users/login", method: "POST"  },
      { url: "/products/Login-page", method: "GET" },
      { url: "/orders/Download-receipt", method: "POST" },
    ],
  });
}


module.exports = loginFilter;
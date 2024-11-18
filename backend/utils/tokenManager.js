const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (id, email) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

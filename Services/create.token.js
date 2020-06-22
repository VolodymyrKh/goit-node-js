const jwt = require("jsonwebtoken");

exports.createToken = async (id) => {
  return jwt.sign({ id }, process.env.PRIVATE_KEY);
};

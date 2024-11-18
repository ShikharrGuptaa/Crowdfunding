const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.protect = (req, res, next) => {
  const token = req.cookies.token; // Exporting token from cookies
  if (!token) {
    return res.status(401).json({ message: `No token, authorization failed` });
  }

  try {
    // Verifying Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;    

    next();
  } catch (error) {
    res.status(401).json({ message: `Token isn't valid` });
  }
};

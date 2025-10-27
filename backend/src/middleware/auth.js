const { verifyAccessToken } = require("../util/jwt");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new Error(`No token found`);

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    throw new Error("Invalid or expired token");
  }
};

module.exports = verifyToken;

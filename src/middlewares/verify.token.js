const jwt = require("jsonwebtoken");
const WrapHandle = require("./handdle.error");

module.exports = WrapHandle(async (req, res, next) => {
  const auth = req.headers["Authorization"] || req.headers["authorization"];
  if (!auth) {
    return res.status(401).json({ msg: "The token is required1." });
  }
  const token = auth.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "The token is required." });
  }
  const currentUser = await jwt.verify(token, process.env.SECRET_KEY);
  req.currentUser = currentUser;

  return next();
});

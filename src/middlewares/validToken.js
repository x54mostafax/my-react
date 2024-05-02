const WrapHandle = require("./handdle.error");
module.exports = (...access) => {
  return (req, res, next) => {
    if (!access.includes(req.currentUser.role)) {
      return res.status(401).json({
        succes: "ERROR.",
        data: { msg: "you Not have access on this data." }
      });
    }
    next();
  };
};

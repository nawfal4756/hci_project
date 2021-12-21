const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SEC, (err, customer) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.customer = customer;
        next();
      });
    } catch (err) {
      return res
        .status(401)
        .json("You are not allowed to perform this operation!");
    }
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.customer.id == req.params.id || req.customer.active) {
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization };

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SEC, (err, employee) => {
        if (err) {
          console.log(err);
          return res.status(403).json("Token is not valid!");
        }
        req.employee = employee;
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
    if (req.employee.id === req.params.id || req.employee.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.employee.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndCowAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.employee.isAdmin || req.employee.cowAccess) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndCustomerAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.employee.isAdmin || req.employee.customerAccess) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndOrderAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.employee.isAdmin || req.employee.orderAccess) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndProductAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.employee.isAdmin || req.employee.productAccess) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndExpenseAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.employee.isAdmin || req.employee.expenseAccess) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndFeedAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.employee.isAdmin ||
      req.employee.expenseAccess ||
      req.employee.cowAccess
    ) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndCowAccess,
  verifyTokenAndCustomerAccess,
  verifyTokenAndOrderAccess,
  verifyTokenAndProductAccess,
  verifyTokenAndExpenseAccess,
  verifyTokenAndFeedAccess,
};

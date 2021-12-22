const router = require("express").Router();
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

// Login
router.post("/login", async (req, res) => {
  try {
    const employee = await Employee.findOne({ username: req.body.username });
    if (!employee) {
      return res.status(401).json("No user is registered with this username!");
    } else if (!employee.active) {
      return res
        .status(401)
        .json("Account is not activated by the administrator");
    }

    if (
      createHash("sha256").update(req.body.password).digest("hex") !==
      employee.password
    ) {
      return res.status(401).json("Incorrect Password!");
    }

    const accessToken = jwt.sign(
      {
        id: employee._id,
        isAdmin: employee.isAdmin,
        cowAccess: employee.cowAccess,
        customerAccess: employee.customerAccess,
        orderAccess: employee.orderAccess,
        productAccess: employee.productAccess,
        expenseAccess: employee.expenseAccess,
        active: employee.active,
      },
      process.env.JWT_SEC,
      { expiresIn: "1h" }
    );

    const { password, ...others } = employee._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

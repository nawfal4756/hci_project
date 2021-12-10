const router = require("express").Router();
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

//Register
router.post("/register", async (req, res) => {
  let employee;
  try {
    employee = await Employee.findOne({ username: req.body.username });
    if (employee) {
      return res.status(409).json("User already exist with this usernmae!");
    }

    employee = await Employee.findOne({ email: req.body.email });
    if (employee) {
      return res.status(409).json("User already exist with this email!");
    }

    employee = await Employee.findOne({
      contactNumbers: req.body.contactNumbers,
    });
    if (employee) {
      return res
        .status(409)
        .json("User already exist with this contact number!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }

  const newEmployee = new Employee({
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    name: req.body.name,
    email: req.body.email,
    addresses: req.body.addresses,
    contactNumbers: req.body.contactNumbers,
    username: req.body.username,
    password: createHash("sha256").update(req.body.password).digest("hex"),
    salary: req.body.salary,
    designation: req.body.designation,
    isAdmin: req.body.isAdmin,
    cowAccess: req.body.cowAccess,
    customerAccess: req.body.customerAccess,
    orderAccess: req.body.orderAccess,
    productAccess: req.body.productAccess,
    expenseAccess: req.body.expenseAccess,
    activeStatus: req.body.activeStatus,
  });

  try {
    const savedEmployee = await newEmployee.save();
    const { password, ...others } = savedEmployee._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const employee = await Employee.findOne({ username: req.body.username });
    if (!employee) {
      return res.status(401).json("No user is registered with this username!");
    } else if (!employee.activeStatus) {
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
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = employee._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyTokenEmployee");
const { createHash } = require("crypto");
const Employee = require("../models/Employee");

router.post("/", verifyTokenAndAdmin, async (req, res) => {
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
    street: req.body.street,
    area: req.body.area,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    phone: req.body.phone,
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

// Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    if (req.body.password) {
      const employee = await Employee.findById(req.params.id);
      if (
        createHash("sha256").update(req.body.oldPassword).digest("hex") ===
        employee.password
      ) {
        req.body.password = createHash("sha256")
          .update(req.body.password)
          .digest("hex");
      } else {
        return res.status(401).json("Old password entered is in correct!");
      }
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Accounts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const employees = await Promise.all(
      (
        await Employee.find()
      ).map((employee) => {
        const { password, ...others } = employee._doc;
        return others;
      })
    );
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Block An Account
router.put("/blocked/:employeeId", verifyTokenAndAdmin, async (req, res) => {
  let value = false;
  try {
    const employee = await Employee.findById(req.params.employeeId);

    if (employee.active) {
      value = false;
    } else {
      value = true;
    }

    const savedEmployee = await Employee.findByIdAndUpdate(
      req.params.employeeId,
      {
        $set: { active: value },
      },
      { new: true }
    );
    res.status(200).json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

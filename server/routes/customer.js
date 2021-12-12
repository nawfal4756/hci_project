const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./verifyTokenCustomer");
const {
  verifyTokenAndAdmin,
  verifyTokenAndCustomerAccess,
} = require("./verifyTokenEmployee");
const { createHash } = require("crypto");
const Customer = require("../models/Customer");

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

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Verification Only
router.put("/verification/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const savedCustomer = await Customer.findById(req.params.id);
    savedCustomer.verification = req.body.verification;
    savedCustomer.active = req.body.active;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: savedCustomer },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Accounts
router.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const customers = await Promise.all(
      (
        await Customer.find()
      ).map((item) => {
        const { password, ...others } = item._doc;
        return others;
      })
    );
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Customer by Employee
router.get("/:customerId", verifyTokenAndCustomerAccess, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    const { password, ...others } = customer._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Customer by Customer
router.get(
  "/:id/:customerId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.customerId);
      const { password, ...others } = customer._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;

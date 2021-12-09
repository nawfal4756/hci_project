const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./verifyTokenCustomer");
const { verifyTokenAndAdmin } = require("./verifyTokenEmployee");
const { createHash } = require("crypto");
const Customer = require("../models/Customer");

// Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = createHash("sha256")
      .update(req.body.password)
      .digest("hex");
  }

  try {
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
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

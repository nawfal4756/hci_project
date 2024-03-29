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
    const customer = await Customer.findOne({
      phone: req.body.phone,
    });
    if (customer) {
      if (customer.phone !== req.body.phone) {
        return res
          .status(409)
          .json("User already exist with this contact number!");
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

// Update User
router.put(
  "/changePassword/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      console.log(customer.password);
      if (
        createHash("sha256").update(req.body.oldPassword).digest("hex") !==
        customer.password
      ) {
        return res.status(409).json("Old Password is not correct!");
      }
      if (req.body.oldPassword === req.body.newPassword) {
        return res
          .status(409)
          .json("Password cannot be changed as it is same as old password!");
      }
      customer.password = createHash("sha256")
        .update(req.body.newPassword)
        .digest("hex");
      const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        { $set: customer },
        { new: true }
      );
      res.status(200).json(updatedCustomer);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

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
router.get("/", verifyTokenAndAdmin, async (req, res) => {
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

// Block An Account
router.put(
  "/blocked/:customerId",
  verifyTokenAndCustomerAccess,
  async (req, res) => {
    let value = false;
    try {
      const customer = await Customer.findById(req.params.customerId);

      if (customer.active) {
        value = false;
      } else {
        value = true;
      }

      const savedCustomer = await Customer.findByIdAndUpdate(
        req.params.customerId,
        {
          $set: { active: value },
        },
        { new: true }
      );
      res.status(200).json(savedCustomer);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;

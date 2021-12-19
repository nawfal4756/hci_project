const router = require("express").Router();
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

//Register
router.post("/register", async (req, res) => {
  let customer;
  try {
    customer = await Customer.findOne({ username: req.body.username });
    if (customer) {
      return res.status(409).json("User already exist with this usernmae!");
    }

    customer = await Customer.findOne({ email: req.body.email });
    if (customer) {
      return res.status(409).json("User already exist with this email!");
    }

    customer = await Customer.findOne({
      phone: req.body.phone,
    });
    if (customer) {
      return res
        .status(409)
        .json("User already exist with this contact number!");
    }
  } catch (err) {
    res.status(500).json(err);
  }

  const newCustomer = new Customer({
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
    customerType: req.body.customerType,
  });

  if (newCustomer.customerType === "B") {
    newCustomer.active = false;
    newCustomer.verification = false;
  } else {
    newCustomer.active = true;
    newCustomer.verification = true;
  }

  try {
    const savedCustomer = await newCustomer.save();
    const { password, ...others } = savedCustomer._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const customer = await Customer.findOne({ username: req.body.username });
    if (!customer) {
      return res.status(401).json("No user is registered with this username!");
    }

    if (
      createHash("sha256").update(req.body.password).digest("hex") !==
      customer.password
    ) {
      return res.status(401).json("Incorrect Password!");
    }

    const accessToken = jwt.sign(
      {
        id: customer._id,
        active: customer.active,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = customer._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

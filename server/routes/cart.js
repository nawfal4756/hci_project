const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("./verifyTokenCustomer");
const Cart = require("../models/Cart");

// Create New
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put("/:id/:cartId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id/:cartId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);
    res.status(200).json("Cart has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Cart
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

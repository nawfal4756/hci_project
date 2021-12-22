const mongoose = require("mongoose");

const ProductScheme = mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    quantityAvailable: { type: Number, default: 0 },
    price: { type: Number, require: true },
    productImage: { type: String, require: true },
    available: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductScheme);

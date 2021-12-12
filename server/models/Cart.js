const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, require: true },
        quantity: { type: Number, require: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

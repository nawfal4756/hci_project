const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    customerId: { type: String, require: true },
    products: [
      {
        productId: { type: String, require: true },
        quantity: { type: Number, require: true },
        price: { type: Number, require: true },
      },
    ],
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    total: { type: Number, require: true },
    additioalNotes: { type: String, default: "" },
    amountPaid: { type: Number, default: 0 },
    amountToBePaid: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

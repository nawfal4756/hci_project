const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    orderNo: { type: String, require: true },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      require: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
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
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, default: "" },
    date: { type: Date, require: true },
    subAmount: { type: Number, require: true },
    tax: { type: Number, require: true },
    totalAmount: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);

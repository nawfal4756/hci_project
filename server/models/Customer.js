const mongoose = require("mongoose");
const DateOnly = require("mongoose-dateonly")(mongoose);

const CustomerSchema = new mongoose.Schema(
  {
    gender: { type: String, required: true },
    dateOfBirth: { type: DateOnly, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    addresses: [
      {
        street: { type: String, required: true },
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
      },
    ],
    contactNumbers: [{ phone: { type: String, required: true, unique: true } }],
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalPayable: { type: Number, default: 0 },
    customerType: { type: String, required: true },
    active: { type: Boolean, default: true },
    verification: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);

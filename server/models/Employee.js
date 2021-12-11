const mongoose = require("mongoose");
const DateOnly = require("mongoose-dateonly")(mongoose);

const EmployeeSchema = new mongoose.Schema(
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
    salary: { type: Number, required: true },
    designation: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    cowAccess: { type: Boolean, default: false },
    customerAccess: { type: Boolean, default: false },
    orderAccess: { type: Boolean, default: false },
    productAccess: { type: Boolean, default: false },
    expenseAccess: { type: Boolean, default: false },
    activeStatus: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);

const mongoose = require("mongoose");

const CowSchema = mongoose.Schema(
  {
    gender: { type: String, require: true },
    dateOfBirth: { type: Date, require: true },
    weight: { type: Number, require: true },
    breed: { type: String, require: true },
    status: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cow", CowSchema);

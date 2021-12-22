const mongoose = require("mongoose");

const MilkProducedSchema = mongoose.Schema(
  {
    cowId: { type: mongoose.Schema.Types.ObjectId, ref: "Cow", require: true },
    milkProduced: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MilkProduced", MilkProducedSchema);

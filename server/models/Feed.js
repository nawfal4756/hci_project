const mongoose = require("mongoose");

const FeedSchema = mongoose.Schema(
  {
    cowId: { type: String, require: true },
    quantity: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feed", FeedSchema);

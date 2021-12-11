const mongoose = require("mongoose");

const FeedGivenSchema = mongoose.Schema(
  {
    cowId: { type: String, require: true },
    feedId: { type: String, require: true },
    quantity: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeedGiven", FeedGivenSchema);

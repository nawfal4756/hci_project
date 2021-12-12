const mongoose = require("mongoose");

const FeedGivenSchema = mongoose.Schema(
  {
    cowId: { type: mongoose.Schema.Types.ObjectId, ref: "Cow", require: true },
    feedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feed",
      require: true,
    },
    quantity: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeedGiven", FeedGivenSchema);

const mongoose = require("mongoose");

const FeedSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  description: { type: String, default: "" },
  quantityAvailable: { type: Number, default: 0 },
});

module.exports = mongoose.model("Feed", FeedSchema);

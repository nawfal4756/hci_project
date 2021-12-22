const router = require("express").Router();
const Feed = require("../models/Feed");
const FeedGiven = require("../models/FeedGiven");
const Expense = require("../models/Expense");
const { verifyTokenAndFeedAccess } = require("./verifyTokenEmployee");

// Create
router.post("/", verifyTokenAndFeedAccess, async (req, res) => {
  const newFeed = new Feed(req.body);

  try {
    const savedFeed = await newFeed.save();
    res.status(200).json(savedFeed);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyTokenAndFeedAccess, async (req, res) => {
  try {
    const updatedFeed = await Feed.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFeed);
  } catch (err) {
    res.status(500).json(res);
  }
});

// Delete
router.delete("/:id", verifyTokenAndFeedAccess, async (req, res) => {
  try {
    await Feed.findByIdAndDelete(req.params.id);
    res.status(200).json("Feed has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use
router.put("/use/:id", verifyTokenAndFeedAccess, async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);
    feed.quantityAvailable -= req.body.quantity;
    const newFeedGiven = new FeedGiven({
      cowId: req.body.cowId,
      feedId: req.params.id,
      quantity: req.body.quantity,
    });
    const savedFeedGiven = await newFeedGiven.save();
    const updatedFeed = await feed.save();
    res.status(200).json(updatedFeed);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add
router.put("/add/:id", verifyTokenAndFeedAccess, async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);
    feed.quantityAvailable += req.body.quantity;
    const newExpense = new Expense({
      title: feed.name,
      description: "Feed Bought",
      date: new Date(),
      subAmount: req.body.unitPrice * req.body.quantity,
    });
    newExpense.tax = newExpense.subAmount * 0.13;
    newExpense.totalAmount = newExpense.tax + newExpense.subAmount;
    const savedExpense = await newExpense.save();
    const updatedFeed = await feed.save();
    res.status(200).json(updatedFeed);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get A Feed
router.get("/:id", verifyTokenAndFeedAccess, async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);
    res.status(200).json(feed);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Feed
router.get("/", verifyTokenAndFeedAccess, async (req, res) => {
  try {
    const feeds = await Feed.find();
    res.status(200).json(feeds);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

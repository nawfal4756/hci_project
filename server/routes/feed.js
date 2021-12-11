const router = require("express").Router();
const Feed = require("../models/Feed");
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

// Use
router.put("/use/:id", verifyTokenAndFeedAccess, async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);
    feed.quantityAvailable -= req.body.quantity;
    const updatedFeed = await feed.save();
    res.status(200).json(updatedFeed);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Buy
router.put("/buy/:id", verifyTokenAndFeedAccess, async (req, res) => {
  try {
    const feed = await Feed.findById(req.params.id);
    feed.quantityAvailable += req.body.quantity;
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

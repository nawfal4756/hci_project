const { verifyTokenAndCowAccess } = require("./verifyTokenEmployee");
const router = require("express").Router();
const Cow = require("../models/Cow");
const MilkProduced = require("../models/MilkProduced");
const orderid = require("order-id")("key");

// Add
router.post("/", verifyTokenAndCowAccess, async (req, res) => {
  const newCow = new Cow(req.body);
  newCow.cowId = orderid.generate(Date());
  try {
    const savedCow = await newCow.save();
    res.status(200).json(savedCow);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:cowId", verifyTokenAndCowAccess, async (req, res) => {
  try {
    const updatedCow = await Cow.findByIdAndUpdate(
      req.params.cowId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCow);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.put("/delete/:cowId", verifyTokenAndCowAccess, async (req, res) => {
  try {
    const savedCow = await Cow.findByIdAndUpdate(
      req.params.cowId,
      { $set: { status: "Death" } },
      { new: true }
    );
    res.status(200).json("Cow Deleted Successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Cows
router.get("/", verifyTokenAndCowAccess, async (req, res) => {
  try {
    const cows = await Cow.find();
    const filteredCows = cows.filter((cow) => cow.status !== "Death");
    res.status(200).json(filteredCows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Cow
router.get("/:cowId", verifyTokenAndCowAccess, async (req, res) => {
  try {
    const cow = await Cow.findById(req.params.cowId);
    if (!cow) {
      return res.status(404).json("Cow ID does not exist");
    } else if (cow.status === "Death") {
      return res.status(404).json("Cow ID does not exist");
    }

    res.status(200).json(cow);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Milk Produced

//Create
router.post("/milk/", verifyTokenAndCowAccess, async (req, res) => {
  const newMilkProduced = new MilkProduced(req.body);
  try {
    const savedMilkProduced = await newMilkProduced.save();
    res.status(200).json(savedMilkProduced);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.post("/milk/:id", verifyTokenAndCowAccess, async (req, res) => {
  try {
    const milkProduced = await MilkProduced.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(milkProduced);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete("/milk/:id", verifyTokenAndCowAccess, async (req, res) => {
  try {
    await MilkProduced.findByIdAndDelete(req.params.id);
    res.status(200).json("Milk Produced Record Deleted Successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Specific
router.get("/milk/:id", verifyTokenAndCowAccess, async (req, res) => {
  try {
    const milkProduced = await MilkProduced.findById(req.params.id);
    res.status(200).json(milkProduced);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/milk", verifyTokenAndCowAccess, async (req, res) => {
  try {
    const milkProduced = await MilkProduced.find();
    res.status(200).json(milkProduced);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

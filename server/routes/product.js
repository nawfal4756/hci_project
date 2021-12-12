const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndProductAccess } = require("./verifyTokenEmployee");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image type is not accepted"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: fileFilter,
});

// Create Product
router.post(
  "/",
  verifyTokenAndProductAccess,
  upload.single("productImage"),
  async (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.productImage = req.file.path;

    if (newProduct.quantityAvailable > 0) {
      newProduct.available = true;
    }

    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Update
router.put("/:id", verifyTokenAndProductAccess, async (req, res) => {
  try {
    if (req.body.quantityAvailable > 0) {
      req.body.available = true;
    }

    if (req.body.quantityAvailable < 0) {
      return res.status(405).json("Value cannot be set because out of range!");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

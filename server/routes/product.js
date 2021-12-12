const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndProductAccess } = require("./verifyTokenEmployee");
const multer = require("multer");
const fs = require("fs").promises;
const path = require("path");

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
    if (req.file) {
      newProduct.productImage = req.file.path;
    }

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
router.put(
  "/:productId",
  verifyTokenAndProductAccess,
  upload.single("productImage"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);

      if (req.body.quantityAvailable > 0) {
        req.body.available = true;
      }

      if (req.body.quantityAvailable < 0) {
        return res
          .status(405)
          .json("Value cannot be set because out of range!");
      }

      if (req.file) {
        const filePath = path.resolve(
          "D://Project//hci_project//server//",
          product.productImage
        );

        await fs.unlink(filePath, (err) => {
          if (err) {
            return res.status(500).json(err);
          }
        });
        req.body.productImage = req.file.path;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Product
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json("Product not found!");
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

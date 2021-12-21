const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { verifyTokenAndOrderAccess } = require("./verifyTokenEmployee");
const { verifyTokenAndAuthorization } = require("./verifyTokenCustomer");
const orderid = require("order-id")("key");

// Create Employee
router.post("/create/employee", verifyTokenAndOrderAccess, async (req, res) => {
  let subTotal = 0;
  const newOrder = new Order(req.body);

  await Promise.all(
    newOrder.products.map(async (productItem) => {
      const product = await Product.findById(productItem.productId);
      if (!product) {
        return res.status(404).json("Product not found!");
      }
      product.quantityAvailable -= productItem.quantity;
      await product
        .save()
        .then()
        .catch((err) => {
          res.status(500).json(err);
        });
      subTotal += product.price * productItem.quantity;
      productItem.price = product.price;
      return productItem;
    })
  );

  newOrder.orderNo = orderid.generate(Date());
  newOrder.subTotal = subTotal.toFixed(2);
  newOrder.tax = (subTotal * 0.13).toFixed(2);
  newOrder.total = (subTotal + newOrder.tax).toFixed(2);
  newOrder.amountToBePaid = newOrder.total.toFixed(2);

  try {
    const savedProduct = await newOrder.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Customer
router.post(
  "/create/customer/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    let subTotal = 0;
    let notFound = false;
    let quantityError = false;
    const newOrder = new Order(req.body);

    if (newOrder.products.length <= 0) {
      return res.status(406).json("Cart cannot be empty");
    }

    await Promise.all(
      newOrder.products.map(async (productItem) => {
        const product = await Product.findById(productItem._id);
        if (!product) {
          notFound = true;
          return;
        }
        product.quantityAvailable -= productItem.quantity;
        product.quantitySold += productItem.quantity;
        if (productItem.quantity > product.quantityAvailable) {
          quantityError = true;
        }
        await product
          .save()
          .then()
          .catch((err) => {
            res.status(500).json(err);
          });
        subTotal += product.price * productItem.quantity;
        productItem.price = product.price * productItem.quantity;
        return productItem;
      })
    );

    if (notFound) {
      return res.status(404).json("Product not found!");
    }

    if (quantityError) {
      return res
        .status(406)
        .json("Quantity Requested for order is not available");
    }

    newOrder.orderNo = orderid.generate(Date());
    newOrder.subTotal = subTotal.toFixed(2);
    newOrder.tax = (subTotal * 0.13).toFixed(2);
    newOrder.total = (subTotal + newOrder.tax).toFixed(2);
    newOrder.amountToBePaid = newOrder.total.toFixed(2);

    try {
      const savedProduct = await newOrder.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Delete Customer
router.delete(
  "/customer/:id/:orderId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json("No order exist with this ID!");
      }
      const total = new Date().getTime() - new Date(order.createdAt).getTime();
      const minutes = Math.floor(total / 1000) / 60;

      if (minutes > 5) {
        return res
          .status(406)
          .json("Order cannot be deleted as time is exceeded by 5 minutes!");
      }

      await Order.findByIdAndDelete(req.params.orderId);
      res.status(200).json("Order deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Delete Employee
router.delete(
  "/employee/:orderId",
  verifyTokenAndOrderAccess,
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json("No order exist with this ID!");
      }

      if (order.status !== "Pending" || order.status !== "Paid") {
        return res
          .status(403)
          .json("Order cannot be deleted as it is now processed!");
      }

      await Order.findByIdAndDelete(req.params.orderId);
      res.status(200).json("Order deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Get All Orders
router.get("/", verifyTokenAndOrderAccess, async (req, res) => {
  try {
    const orders = await Promise.all(
      (
        await Order.find()
          .populate("products.productId", "name")
          .populate("customerId", "name contactNumbers")
      ).map((order) => {
        const total =
          new Date().getTime() - new Date(order.createdAt).getTime();
        const minutes = Math.floor(total / 1000) / 60;
        if (minutes > 5) {
          return order;
        }
      })
    );
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Order Customer
router.get(
  "/customer/:id/:orderId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json("No order exist with this ID!");
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Get Order Employee
router.get(
  "/employee/:orderId",
  verifyTokenAndOrderAccess,
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json("No order exist with this ID!");
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Update Status
router.put("/:orderId", verifyTokenAndOrderAccess, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: { status: req.body.status },
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Orders of Customer for Customer
router.get("/customer/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const customerOrders = await Order.find({ customerId: req.params.id });
    res.status(200).json(customerOrders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

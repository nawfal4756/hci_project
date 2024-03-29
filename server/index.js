const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const authCustomerRoute = require("./routes/authCustomer");
const authEmployeeRoute = require("./routes/authEmployee");
const customerRoute = require("./routes/customer");
const employeeRoute = require("./routes/employee");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const expenseRoute = require("./routes/expense");
const feedRoute = require("./routes/feed");
const orderRoute = require("./routes/order");
const cowRoute = require("./routes/cow");
const stripeRoute = require("./routes/stripe");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MDB_KEY)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log("DB Connection Error: ", err);
  });

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use("/uploads", express.static("./uploads"));
app.use("/api/authCustomers", authCustomerRoute);
app.use("/api/authEmployees", authEmployeeRoute);
app.use("/api/customers", customerRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/expenses", expenseRoute);
app.use("/api/feeds", feedRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cows", cowRoute);
app.use("/api/checkout", stripeRoute);
app.get("/api", (req, res) => {
  res.status(200).send("<h1>Hello Yaar! Under Construction!!!</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});

module.exports = app;

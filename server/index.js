const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authCustomerRoute = require("./routes/authCustomer");
const authEmployeeRoute = require("./routes/authEmployee");
const customerRoute = require("./routes/customer");
const employeeRoute = require("./routes/employee");
const productRoute = require("./routes/product");

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
app.use("/api/authCustomers", authCustomerRoute);
app.use("/api/authEmployees", authEmployeeRoute);
app.use("/api/customers", customerRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/products", productRoute);
app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello Yaar! Under Construction!!!</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});

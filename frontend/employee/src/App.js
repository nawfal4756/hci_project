import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./components/Home/Home";
import MenuBar from "./components/MenuBar/MenuBar";
import Login from "./components/Login/Login";
import SnackBar from "./components/SnackBar/SnackBar";
import CowOutlet from "./components/Cow/CowOutlet";
import Cow from "./components/Cow/Cow";
import CustomerOutlet from "./components/Customer/CustomerOutlet";
import Customer from "./components/Customer/Customer";
import EmployeeOutlet from "./components/Employee/EmployeeOutlet";
import Employee from "./components/Employee/Employee";
import ExpenseOutlet from "./components/Expense/ExpenseOutlet";
import Expense from "./components/Expense/Expense";
import FeedOutlet from "./components/Feed/FeedOutlet";
import Feed from "./components/Feed/Feed";
import OrderOutlet from "./components/Order/OrderOutlet";
import Order from "./components/Order/Order";
import ProductOutlet from "./components/Product/ProductOutlet";
import Product from "./components/Product/Product";
import AddCow from "./components/Cow/AddCow";
import ModifyCow from "./components/Cow/ModifyCow";
import AddProduct from "./components/Product/AddProduct";
import ModifyProduct from "./components/Product/ModifyProduct";
import AddMilkProduced from "./components/Cow/AddMilkProduced";

function App() {
  const user = useSelector((state) => state.user.loggedIn);
  return (
    <div>
      <Router>
        {user ? <MenuBar /> : null}
        <SnackBar />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="dashboard"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="cows"
            element={user ? <CowOutlet /> : <Navigate to="/login" />}
          >
            <Route
              path=""
              element={user ? <Cow /> : <Navigate to="/login" />}
            />
            <Route
              path="add"
              element={user ? <AddCow /> : <Navigate to="/login" />}
            />
            <Route
              path=":id"
              element={user ? <ModifyCow /> : <Navigate to="/login" />}
            />
            <Route
              path="milk/add"
              element={user ? <AddMilkProduced /> : <Navigate to="/login" />}
            />
          </Route>
          <Route
            path="customers"
            element={user ? <CustomerOutlet /> : <Navigate to="/login" />}
          >
            <Route
              path=""
              element={user ? <Customer /> : <Navigate to="/login" />}
            />
          </Route>
          <Route
            path="employees"
            element={user ? <EmployeeOutlet /> : <Navigate to="/login" />}
          >
            <Route
              path=""
              element={user ? <Employee /> : <Navigate to="/login" />}
            />
          </Route>
          <Route
            path="expenses"
            element={user ? <ExpenseOutlet /> : <Navigate to="/login" />}
          >
            <Route
              path=""
              element={user ? <Expense /> : <Navigate to="/login" />}
            />
          </Route>
          <Route
            path="feeds"
            element={user ? <FeedOutlet /> : <Navigate to="/login" />}
          >
            <Route
              path=""
              element={user ? <Feed /> : <Navigate to="/login" />}
            />
          </Route>
          <Route
            path="orders"
            element={user ? <OrderOutlet /> : <Navigate to="/login" />}
          >
            <Route
              path=""
              element={user ? <Order /> : <Navigate to="/login" />}
            />
          </Route>
          <Route
            path="products"
            element={user ? <ProductOutlet /> : <Navigate to="/login" />}
          >
            <Route
              path=""
              element={user ? <Product /> : <Navigate to="/login" />}
            />
            <Route
              path="add"
              element={user ? <AddProduct /> : <Navigate to="/login" />}
            />
            <Route
              path=":id"
              element={user ? <ModifyProduct /> : <Navigate to="/login" />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

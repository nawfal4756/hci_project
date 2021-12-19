import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { MenuBar } from "./components/MenuBar/MenuBar";
import Register from "./components/Register/Register";
import Store from "./components/Store/Store";
import StoreOutlet from "./components/Store/StoreOutlet";
import StoreProduct from "./components/Store/StoreProduct";
import MyAccount from "./components/MyAccount/MyAccount";
import PasswordChange from "./components/PasswordChange/PasswordChange";
import Orders from "./components/Orders/Orders";
import Cart from "./components/Cart/Cart";

function App() {
  const user = useSelector((state) => state.user.loggedIn);
  return (
    <div>
      <Router>
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about-us"></Route>
          <Route path="store" element={<StoreOutlet />}>
            <Route path="" element={<Store />} />
            <Route path=":id" element={<StoreProduct />} />
          </Route>
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="myaccount"
            element={user ? <MyAccount /> : <Navigate to="login" />}
          />
          <Route path="password" element={<PasswordChange />} />
          <Route path="orders" element={<Orders />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

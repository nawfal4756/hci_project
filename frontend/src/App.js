import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="myaccount" element={<MyAccount />} />
          <Route path="password" element={<PasswordChange />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

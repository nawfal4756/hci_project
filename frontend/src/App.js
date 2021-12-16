import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { MenuBar } from "./components/MenuBar/MenuBar";
import Register from "./components/Register/Register";
import Store from "./components/Store/Store";
import StoreOutlet from "./components/Store/StoreOutlet";
import StoreProduct from "./components/Store/StoreProduct";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

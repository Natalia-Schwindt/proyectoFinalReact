import React from "react";
import { Route, Routes } from "react-router-dom"

import  Login  from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import Create from "../pages/Create";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";


const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
    </Routes>
  )
}

export default Routing

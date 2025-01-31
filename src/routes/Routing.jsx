import React from "react";
import { Route, Routes } from "react-router-dom"

import  Login  from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import Home from "../pages/Home";


const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Routing

import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import Create from "../pages/Create";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import ProtectedRoute from "./ProtectedRoute";
import Products from "../components/Products";
import NotFound from "../pages/NotFound";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route path="/create" element={<Create />} />
      </Route>
    </Routes>
  );
};

export default Routing;

import React from "react";
import { Route, Routes } from "react-router-dom";

import Products from "../components/Products";
import Login from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import CartPage from "../pages/CartPage";
import Create from "../pages/Create";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import ProtectedRoute from "./ProtectedRoute";

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

      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
      </Route>
      
      <Route element={<ProtectedRoute adminOnly={true} />}>
        <Route path="/create" element={<Create />} />
      </Route>
    </Routes>
  );
};

export default Routing;
import React, { createContext, useContext, useEffect,useState } from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    setCart((prevCart) => {
      const itemExists = prevCart.find(
        (item) => item.id === product.id && item.name === product.name);

      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id && item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId, productName) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.id === productId && item.name === productName) {
          if (item.quantity > 1) {
            return { ...item, quantity : item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      }).filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

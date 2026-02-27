"use client";

import { createContext, useContext, useState } from "react";
import { supabase } from "../lib/supabase";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = async (item) => {
    const existing = cart.find((i) => i.name === item.name);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((i) =>
        i.name === item.name
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(updatedCart);

    // Show popup
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);

    // Save to Supabase
    await supabase.from("cart_items").insert([
      {
        product_name: item.name,
        price: item.price,
        quantity: 1,
      },
    ]);
  };

  const increaseQty = (name) => {
    setCart(
      cart.map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (name) => {
    setCart(
      cart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        total,
        showPopup,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

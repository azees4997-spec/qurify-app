"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>

      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          {item.name} - ₹{item.price}
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <Link href="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
}

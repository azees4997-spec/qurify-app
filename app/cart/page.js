"use client";

export const dynamic = "force-dynamic";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const cartContext = useCart();

  if (!cartContext) return null;

  const { cart, removeFromCart } = cartContext;

  const total = cart.reduce(
    (sum, item) => sum + item.generic_price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <h3>{item.generic_name}</h3>
              <p>₹{item.generic_price}</p>
              <p>Qty: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <Link href="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

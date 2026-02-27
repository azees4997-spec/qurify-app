"use client";
export const dynamic = "force-dynamic";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, total } =
    useCart();

  return (
    <div className="container">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty.</p>}

      {cart.map((item) => (
        <div key={item.name} className="cart-item">
          <div>
            <strong>{item.name}</strong>

            <div style={{ marginTop: 5 }}>
              <button onClick={() => decreaseQty(item.name)}>
                -
              </button>

              <span style={{ margin: "0 10px" }}>
                {item.quantity}
              </span>

              <button onClick={() => increaseQty(item.name)}>
                +
              </button>
            </div>
          </div>

          <div>
            ₹{item.price * item.quantity}
          </div>
        </div>
      ))}

      {/* STICKY CHECKOUT */}
      {cart.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            background: "white",
            padding: "15px 30px",
            boxShadow: "0 -5px 15px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: 600 }}>
            Total: ₹{total}
          </div>

          <Link href="/checkout">
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

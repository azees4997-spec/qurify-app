"use client";

export const dynamic = "force-dynamic";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const cartContext = useCart();
  const router = useRouter();

  if (!cartContext) return null;

  const { cart, clearCart } = cartContext;

  const total = cart.reduce(
    (sum, item) => sum + item.generic_price * item.quantity,
    0
  );

  const handleOrder = () => {
    clearCart();
    alert("Order Placed Successfully!");
    router.push("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Checkout</h1>

      <h2>Total: ₹{total}</h2>

      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}

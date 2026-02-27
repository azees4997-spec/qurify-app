"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { clearCart } = useCart();
  const router = useRouter();

  const placeOrder = () => {
    clearCart();
    router.push("/order-success");
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <p>Payment Mode: Cash on Delivery</p>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

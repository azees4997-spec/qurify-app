"use client";

import "./globals.css";
import Link from "next/link";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/CartContext";

function Navbar() {
  const cartContext = useCart();
  const count = cartContext?.cart?.length || 0;

  return (
    <div className="navbar">
      <Link href="/" className="logo">Qurify</Link>

      <div className="nav-right">
        <Link href="/catalogue" className="nav-link">Medicines</Link>

        <Link href="/cart" className="cart-icon">
          🛒
          {count > 0 && <span className="cart-count">{count}</span>}
        </Link>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

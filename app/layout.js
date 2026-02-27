"use client";

import { CartProvider } from "./context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Qurify - Save on Medicines",
  description: "Switch to affordable generic medicines",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {/* SINGLE NAVBAR */}
        <div
          style={{
            background: "#0F172A",
            color: "white",
            padding: "15px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Link href="/" style={{ color: "#F97316", fontWeight: "bold", fontSize: 22, textDecoration: "none" }}>
            Qurify
          </Link>

          <div style={{ display: "flex", gap: 25 }}>
            <Link href="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
            <Link href="/catalogue" style={{ color: "white", textDecoration: "none" }}>Medicines</Link>
            <Link href="/cart" style={{ color: "white", textDecoration: "none" }}>Cart</Link>
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}

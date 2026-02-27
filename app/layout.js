import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Link from "next/link";

export const metadata = {
  title: "Qurify",
  description: "Save More with Generic Medicines",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          <nav
            style={{
              background: "#1E3A8A",
              padding: "15px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            <h2 style={{ color: "#F97316", margin: 0 }}>Qurify</h2>
            <div>
              <Link href="/" style={{ color: "white", marginRight: 20 }}>
                Home
              </Link>
              <Link href="/cart" style={{ color: "white" }}>
                Cart
              </Link>
            </div>
          </nav>

          {children}
        </CartProvider>
      </body>
    </html>
  );
}

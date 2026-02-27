import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Qurify",
  description: "Save on Medicines"
};

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

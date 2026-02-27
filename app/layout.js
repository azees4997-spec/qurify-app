import "./globals.css";

export const metadata = {
  title: "Qurify - Save on Medicines",
  description: "Buy generic medicines and save more"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

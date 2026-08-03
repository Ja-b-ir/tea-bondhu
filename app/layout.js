import "./globals.css";

export const metadata = {
  title: "Tea বন্ধু",
  description: "AI-powered tea leaf disease detection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

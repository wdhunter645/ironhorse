import "./globals.css";
import type { ReactNode } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "ironhorse",
  description: "Project scaffold",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main style={{ minHeight: "70vh", padding: "24px", fontFamily: "ui-sans-serif" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

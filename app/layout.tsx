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
        <main className="container" style={{ paddingTop: 16, paddingBottom: 24 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import Header from "@components/Header";
import Footer from "@components/Footer";

export const metadata: Metadata = {
  title: "Lou Gehrig Fan Club",
  description: "Phase-3 scaffold",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

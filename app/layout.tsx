import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lou Gehrig Fan Club",
  description: "A zero-profit initiative supporting ALS research.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 antialiased">
        <Header />
        <main className="container mx-auto px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

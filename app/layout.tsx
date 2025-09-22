import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lou Gehrig Fan Club",
  description: "Phase 3/4 drop-in — styled shell with routes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container" style={{paddingTop: '16px', paddingBottom: '24px'}}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

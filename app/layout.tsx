import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "THIERRY BNB | Vacation Rentals",
  description: "Book unique stays and experiences in Rwanda",
};

import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
        <footer className="bg-gray-100 py-12 mt-20">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            © 2026 THIERRY BNB. Built for Assignment 6.
          </div>
        </footer>
          </SessionProvider>
        </body>
    </html>
  );
}

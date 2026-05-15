import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RENT IN RWANDA | Premium Stays in Rwanda",
  description: "Experience luxury and comfort in the heart of Rwanda. Book your perfect stay with RENT IN RWANDA.",
  icons: {
    icon: '/favicon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rent Rwanda",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#00A1DE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};


import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import PWARegistration from "@/components/PWARegistration";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PWARegistration />
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}


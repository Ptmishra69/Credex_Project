import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Spend Audit — Optimize Your AI Tooling Costs",
  description:
    "Startups input their AI tooling spend and receive an optimization audit with actionable savings recommendations.",
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased bg-slate-950 text-white">
        {children}
        <Toaster theme="dark" position="top-right" closeButton />
      </body>
    </html>
  );
}

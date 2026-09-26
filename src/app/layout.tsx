"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useSidebarStore } from "@/store/sidebar-store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isOpen = useSidebarStore((s) => s.isOpen);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="flex">
          <Sidebar />
          <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-[20%]" : "ml-[70px]"}`}>
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
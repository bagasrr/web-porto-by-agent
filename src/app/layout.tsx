import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bagas Ramadhan Rusnadi | Software Engineer",
  description: "Personal portfolio of Bagas Ramadhan Rusnadi - Software Engineer",
};

import { prisma } from '@/lib/prisma'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await prisma.profile.findFirst()
  const themeClass = profile?.theme ? `theme-${profile.theme}` : 'theme-light-1'

  return (
    <html lang="en" className={`${spaceMono.variable} ${inter.variable} ${themeClass}`}>
      <body className="min-h-screen font-[family-name:var(--font-inter)]">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

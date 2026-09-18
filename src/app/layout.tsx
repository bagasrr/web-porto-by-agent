import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getProfile } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bagas Ramadhan Rusnadi | Software Engineer",
  description:
    "Personal portfolio of Bagas Ramadhan Rusnadi — Software Engineer specializing in full-stack web development.",
  openGraph: {
    title: "Bagas Ramadhan Rusnadi | Software Engineer",
    description:
      "Personal portfolio of Bagas Ramadhan Rusnadi — Software Engineer specializing in full-stack web development.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  const themeClass =
    profile?.theme === "light" ? "theme-light" : "theme-dark";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${themeClass}`}
    >
      <body className="min-h-screen antialiased font-[family-name:var(--font-inter)]">
        <Navbar profile={profile} />
        <main>{children}</main>
      </body>
    </html>
  );
}

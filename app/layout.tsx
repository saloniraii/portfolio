import type { Metadata } from "next";
import { Playfair_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/cursor/CustomCursor";
import CursorHalo from "@/components/cursor/CursorHalo";
import GridBackground from "@/components/shared/GridBackground";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Saloni Rai — Portfolio",
  description: "Designer, creator, and vibrant human.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative font-body bg-background text-foreground">
        <GridBackground />
        <CustomCursor />
        <CursorHalo />
        {children}
      </body>
    </html>
  );
}

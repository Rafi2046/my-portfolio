import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ishmak Rahat Rafi — Flutter Developer",
  description:
    "Portfolio of Ishmak Rahat Rafi, Flutter developer at Onesttech Software Solutions — mobile architecture, Dart, and computer science foundations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

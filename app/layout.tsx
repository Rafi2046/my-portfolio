import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Polish } from "@/components/Polish";
import "lenis/dist/lenis.css";
import { site } from "@/lib/content";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ishmak Rahat Rafi — Flutter Developer",
  description:
    "Portfolio of Ishmak Rahat Rafi, Flutter developer at Onesttech Software Solutions. RUSHD, Quran Audio, Budget Mint, FuelSync, Dosey and more.",
};

/** Applies a saved theme choice before paint so there's no flash. */
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Browser extensions (e.g. ColorZilla) add attributes to body before hydration. */}
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-canvas text-ink">
        {/* Intro curtain; slides away on its own via CSS. */}
        <div
          aria-hidden
          className="intro-curtain pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0b0c]"
        >
          <p className="intro-curtain-text text-lg font-medium text-[#f2f2f0]">
            Design &amp; code by {site.navBrand}
          </p>
        </div>
        <Polish />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ChainSwitchBanner } from "@/components/ChainSwitchBanner";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Building Culture — Real estate on 0G",
  description:
    "Buy fractional real estate shares with OG tokens. Transparent, liquid, and built for the next era of on-chain property.",
  openGraph: {
    title: "Building Culture — Real estate on 0G",
    description: "Tokenized real estate on 0G. Fractional shares, AMM liquidity, compliance-ready.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-surface text-white antialiased`}
      >
        <Providers>
          <Nav />
          <ChainSwitchBanner />
          {/* No animate-page-in on <main>: client-side navigations can restart the animation and re-apply keyframe opacity:0, making styles/content appear to vanish until the animation finishes. */}
          <main className="relative mx-auto min-h-[60vh] w-full max-w-[1280px] px-4 py-8 sm:px-8">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

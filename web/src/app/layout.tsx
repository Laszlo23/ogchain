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
  title: "Building Culture — Community owned real estate on 0G",
  description:
    "Tokenized real estate with an eco-forward fintech experience: fractional shares, AMM liquidity, and compliance-ready flows on 0G testnet.",
  openGraph: {
    title: "Building Culture — Community owned real estate on 0G",
    description:
      "Explore tokenized property, trade shares, and follow the roadmap — testnet-first; verify disclosures before any production use.",
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

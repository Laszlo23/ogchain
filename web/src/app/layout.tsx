import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteChrome } from "@/components/SiteChrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://buildingculture.capital";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  title: "Building Culture — Community-owned cultural real estate on 0G",
  description:
    "Building Culture Land: community funding for coworking, cultural, and housing — tokenized shares and on-chain liquidity on 0G. Verify issuer disclosures before any commitment.",
  openGraph: {
    title: "Building Culture — Community-owned cultural real estate on 0G",
    description:
      "Launch and fund community-owned places with tokenized ownership on 0G — not investment advice.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Culture — Community-owned cultural real estate on 0G",
    description:
      "Community funding rounds for cultural real estate on 0G — not investment advice.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1814",
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
          {/* No animate-page-in on <main>: client-side navigations can restart the animation and re-apply keyframe opacity:0, making styles/content appear to vanish until the animation finishes. */}
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}

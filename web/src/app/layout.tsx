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
  title: "Building Culture — Cultural real estate on Base",
  description:
    "Community funding for coworking, cultural, and housing — tokenized shares and liquidity on Base. Issuer disclosures and Legal hub.",
  openGraph: {
    title: "Building Culture — Cultural real estate on Base",
    description:
      "Launch and fund community-owned places with tokenized ownership on Base — full economics in issuer materials.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Culture — Cultural real estate on Base",
    description:
      "Community funding rounds for cultural real estate — Building Culture on Base.",
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

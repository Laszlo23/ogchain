import type { Metadata } from "next";
import { ImmersiveExperience } from "@/components/experience/ImmersiveExperience";

const ogImagePath = "/extracted/water-side-keutschach-20220112/page-01.jpg";

export const metadata: Metadata = {
  title: "Immersive story — Building Culture | Community-owned cultural real estate",
  description:
    "Full-screen visual story: community-owned cultural assets, curated Culture Land listings, and transparent reference financials — live on 0G; not investment advice.",
  keywords: [
    "Building Culture",
    "community real estate",
    "tokenized property",
    "RWA",
    "cultural real estate",
    "0G",
    "fractional ownership",
    "community funding",
    "real estate crowdfunding",
  ],
  authors: [{ name: "Building Culture" }],
  alternates: {
    canonical: "/experience",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Immersive story — Building Culture",
    description:
      "Photography-led narrative of community-owned places, protocol rails, and reference campaign context — explore before you invest time on-chain.",
    type: "website",
    url: "/experience",
    siteName: "Building Culture",
    locale: "en_US",
    images: [
      {
        url: ogImagePath,
        width: 1920,
        height: 1080,
        alt: "Building Culture — immersive flagship visual story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Immersive story — Building Culture",
    description:
      "Own the narrative: community-first capital for cultural real estate — reference metrics on 0G.",
    images: [ogImagePath],
  },
};

export default function ExperiencePage() {
  return (
    <div className="min-h-[100dvh] bg-black">
      <ImmersiveExperience />
    </div>
  );
}

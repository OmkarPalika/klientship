import { PricingPage } from "@/components/pricing/PricingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klientship - Professional Web & App Development Services",
  description: "Discover our range of professional web and app development services tailored to meet your business needs. From website development to e-commerce and SEO services.",
  keywords: "web development, app development, e-commerce, SEO, website design, professional services, digital marketing",
  authors: [{ name: "Klientship Development Team" }],
  openGraph: {
    title: "Klientship - Professional Web & App Development Services",
    description: "Discover our range of professional web and app development services tailored to meet your business needs.",
    type: "website",
    locale: "en_US",
    url: "https://klientship.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klientship - Professional Web & App Development Services",
    description: "Discover our range of professional web and app development services tailored to meet your business needs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <PricingPage />;
} 
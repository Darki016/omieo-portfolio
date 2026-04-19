import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AmbientBackground from "@/components/AmbientBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import CursorGlow from "@/components/CursorGlow";
import PageLoader from "@/components/PageLoader";
import DotNav from "@/components/DotNav";
import SchemaMarkup from "@/components/SchemaMarkup";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Omieo Zaman | Premium WordPress & WooCommerce Developer",
    template: "%s | Omieo Zaman"
  },
  description: "The digital portfolio of Omieo Zaman. Bridging the gap between Medicine (MBBS) and Technology. Specialist in WordPress, WooCommerce, and E-commerce Development.",
  keywords: ["Omieo", "Omieo Zaman", "Medical Student", "Web Developer", "WordPress Developer", "WooCommerce", "E-commerce", "Bangladesh Developer", "Freelance Web Developer"],
  authors: [{ name: "Omieo Zaman" }],
  creator: "Omieo Zaman",
  metadataBase: new URL('https://omieo-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omieo-portfolio.vercel.app",
    title: "Omieo Zaman | High-Performance WordPress Developer",
    description: "Medical Student & Specialist WordPress Developer. Building WooCommerce stores that actually sell with custom logic and premium design.",
    siteName: "Omieo Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Omieo Portfolio Identity"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Omieo | Medical Student & Developer",
    description: "Building WordPress & WooCommerce stores that actually sell.",
    images: ["/logo.png"],
    creator: "@omieo"
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "66oUx5mRarw6fKdQ5P7G9fVPbinbAAXHoqNoALBVuQ4",
  },
};

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased text-foreground`}
        suppressHydrationWarning
      >
        <SpeedInsights />
        <Analytics />
        <ThemeProvider>
          <SchemaMarkup />
          <PageLoader />
          <AmbientBackground />
          <DotNav />
          <Navbar />
          <CursorGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AmbientBackground from "@/components/AmbientBackground";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

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
    default: "Omieo | Medical Student & Full-Stack Developer",
    template: "%s | Omieo"
  },
  description: "The digital portfolio of Omieo Zaman. Bridging the gap between Medicine (MBBS) and Technology. Specialist in Next.js, React, Webflow, and High-Performance UI Design.",
  keywords: ["Omieo", "Omieo Zaman", "Medical Student", "Web Developer", "Next.js Developer", "React", "Frontend Engineer", "UI/UX Design", "Bangladesh Developer", "Creative Coding"],
  authors: [{ name: "Omieo Zaman" }],
  creator: "Omieo Zaman",
  metadataBase: new URL('https://omieo.vercel.app'), // Placeholder, replace with actual domain if known
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omieo.vercel.app",
    title: "Omieo | Leveling Up",
    description: "Medical Student by Day, Full-Stack Architect by Night. Explore the intersection of biological systems and digital logic.",
    siteName: "Omieo Portfolio",
    images: [
      {
        url: "/logo.png", // Fallback to logo, ideally a 1200x630 og-image
        width: 1200,
        height: 630,
        alt: "Omieo Portfolio Identity"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Omieo | Medical Student & Developer",
    description: "Leveling between the Stethoscope and the Syntax.",
    images: ["/logo.png"],
    creator: "@omieo" // Replace if user has a specific handle
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
};

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased text-foreground`}
      >
        <SpeedInsights />
        <Analytics />
        <ThemeProvider>
          <AmbientBackground />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

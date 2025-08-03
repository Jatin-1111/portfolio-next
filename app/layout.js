// app/layout.js
import { Montserrat, Roboto, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import LenisProvider from "./components/LenisProvider";
import StructuredData from "./components/StructuredData";

// Load fonts with specific subsets and assign CSS variables for easy use
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Load weights as needed
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Load weights as needed
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"], // Load weights as needed
});

// Metadata for the project
export const metadata = {
  title: {
    default: "Jatin Kumar | Full-Stack Web Developer",
    template: "%s | Jatin Kumar - Full-Stack Developer Portfolio"
  },
  description: "Full-Stack Web Developer specializing in Next.js, React.js, Node.js and MongoDB. Building modern, responsive web apps with clean code and great UX.",
  keywords: ["full-stack developer", "web developer", "next.js", "react.js", "node.js", "express.js", "mongodb", "javascript", "tailwind css", "portfolio", "jatin kumar", "backend developer"],
  authors: [{ name: "Jatin Kumar" }],
  creator: "Jatin Kumar",
  publisher: "Jatin Kumar",
  metadataBase: new URL('https://jatinx.tech'), // CRITICAL: This fixes all relative URLs
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://jatinx.tech/",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jatinx.tech/',
    siteName: 'Jatin Kumar Portfolio',
    title: 'Jatin Kumar | Full-Stack Web Developer',
    description: 'Full-Stack Web Developer specializing in Next.js, React.js, Node.js and MongoDB.',
    images: [
      {
        url: '/og-image.png', // Will resolve to https://jatinx.tech/og-image.png
        width: 1200,
        height: 630,
        alt: 'Jatin Kumar - Full-Stack Web Developer Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jatinx_tech', // Create this Twitter handle!
    creator: '@jatinx_tech',
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Critical Resource Hints */}
        <link rel="preload" href="/img.jpg" as="image" />
        <link rel="icon" href="/portfolio.png" type="image/png" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Structured Data */}
        <StructuredData />

        {/* Critical CSS - Inline for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .critical-css {
              font-display: swap;
              contain: layout style paint;
            }
            /* Add critical above-the-fold styles here */
          `
        }} />
      </head>
      <body className={`${montserrat.variable} ${roboto.variable} ${firaCode.variable} critical-css`}>
        <LenisProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
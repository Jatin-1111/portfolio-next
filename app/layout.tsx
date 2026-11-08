import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { PageMotion } from "@/components/site/page-motion";
import { StructuredData } from "@/components/site/structured-data";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "full-stack developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript",
    "React developer",
    "Jatin Kumar",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`scroll-pt-24 ${inter.variable} ${newsreader.variable} ${mono.variable}`}
      // The inline script below adds a class before hydration
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint: opts into the hero's drawn start states
            only when motion is welcome, so reduced-motion visitors and
            no-JS visitors always get the finished, static page. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')",
          }}
        />
      </head>
      <body className="antialiased">
        <StructuredData />
        <SmoothScroll />
        <PageMotion />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/site/nav";
import { NavSpy } from "@/components/site/nav-spy";
import { BuildIntro } from "@/components/build/build-intro";
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
      className={`${inter.variable} ${newsreader.variable} ${mono.variable}`}
      // The inline script below adds the `build` class before hydration
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint. First visit in a session: opt into the
            build-up intro (CSS hides every [data-b] piece while html.build
            is set). Return visits and deep links get the finished page.
            The timeout is a failsafe so content can never stay hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;if(sessionStorage.getItem('pf-built')||location.hash)return;d.classList.add('build');window.__pfFailsafe=setTimeout(function(){d.classList.remove('build')},30000)}catch(e){}})()",
          }}
        />
      </head>
      <body className="antialiased">
        <StructuredData />
        <div className="canvas-grid" aria-hidden="true" />
        <Nav />
        <NavSpy />
        <BuildIntro />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}

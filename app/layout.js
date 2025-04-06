import { Montserrat, Roboto, Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

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
    canonical: "https://jatin0111.vercel.app/",
  },
  manifest: "/manifest.json", // Create this file for PWA support
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/portfolio.png" as="image" />
        <link rel="preload" href="/img.jpg" as="image" />
      </head>
      <body
        className={`${montserrat.variable} ${roboto.variable} ${firaCode.variable} text-textMain antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

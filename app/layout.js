import { Montserrat, Roboto, Fira_Code } from "next/font/google";
import "./globals.css";

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
  title: "Portfolio",
  description: "Showcasing my projects and experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/portfolio.png" />
      </head>
      <body
        className={`${montserrat.variable} ${roboto.variable} ${firaCode.variable} text-textMain antialiased`}
      >
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

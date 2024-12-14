/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        screen: "100vh",
      },
      animation: {
        spin: "spin 2s linear infinite",
      },
      colors: {
        primary: "#121212", // Primary Background
        accentBlue: "#1E90FF", // Dodger Blue for highlights and buttons
        accentGreen: "#00FFAB", // Neon Green for hover effects or emphasis
        accentPurple: "#BB86FC", // Purple for secondary elements
        textMain: "#E0E0E0", // Light Gray for main text
        textSecondary: "#B0B0B0", // Darker Gray for secondary text
        linkHover: "#1E90FF", // Blue for links and hover effects
      },
      fontFamily: {
        header: ['Montserrat', 'sans-serif'], // For Headers
        body: ['Roboto', 'sans-serif'], // For Body Text
        code: ['Fira Code', 'monospace'], // For Code Blocks
      },
    },
  },
  plugins: [],
};

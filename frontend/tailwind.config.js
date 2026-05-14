/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["'Syne'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        bg: "#0a0e1a",
        surface: "#111827",
        surface2: "#1a2236",
        corp: {
          central: "#f97316",
          east: "#06b6d4",
          west: "#a855f7",
          north: "#22c55e",
          south: "#f43f5e",
        },
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s ease",
        spin: "spin 0.7s linear infinite",
      },
    },
  },
  plugins: [],
};

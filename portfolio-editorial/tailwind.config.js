/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: "#f5f5f2",
        paper: "#12151c",
        line: "rgba(245, 245, 242, 0.14)",
        muted: "#8a8a86",
      },
      fontSize: {
        "clamp-hero": "clamp(2.25rem, 5vw, 4.25rem)",
        "clamp-h1": "clamp(1.5rem, 2.75vw, 2.5rem)",
        "clamp-h2": "clamp(1.125rem, 1.9vw, 1.625rem)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.28em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

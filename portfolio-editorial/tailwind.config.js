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
        paper: "#0a0a0a",
        line: "rgba(245, 245, 242, 0.14)",
        muted: "#8a8a86",
      },
      fontSize: {
        "clamp-hero": "clamp(3rem, 12vw, 9.5rem)",
        "clamp-h1": "clamp(2.5rem, 7vw, 5.5rem)",
        "clamp-h2": "clamp(2rem, 5vw, 3.75rem)",
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

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        active: "#68D391", // Green for active items
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"], // Add Outfit with a fallback
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(142deg, rgba(43,91,74,1) 21%, rgba(15,40,48,1) 90%)",
      },
    },
  },
  plugins: [],
};

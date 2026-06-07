const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      classes: {
        "link-button":
          "px-6 py-2 border-[1px] shadow-xl dark:border-neutral-800 border-neutral-200 backdrop-blur-md rounded-lg dark:hover:bg-transparent hover:bg-[#ddd4c2] transition hover:scale-110 duration-300 ease-in-out",
      },
      fontFamily: {
        spacegrotesk: ["var(--font-spacegrotesk)"],
        inter: ["var(--font-Inter)"],
        exo2: ["var(--font-exo2)"],
        sono: ["var(--font-sono)"],
        sometypemono: ["var(--font-sometypemono)"],
        oswald: ["var(--font-oswald)"],
      },
      colors: {
        "custom-dark": "#222831",
        spaceblack: "#18181b",
      },
    },
  },
  darkMode: "class",
};

export default config;

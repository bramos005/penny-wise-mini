import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-blue": "#245EE7",
        "custom-white": "#F8F9FD",
        "custom-gray": "#9AA6B8",
        "dash-gray": "#49586D",
        "icon-gray": "#E5E8EF"
      },
      screens: {
        "900": "900px",
        "1409": "1409px",
        "500": "500px",
        "623": "623px",
        "770": "770px",
        "1358": "1358px"
      }
    },
  },
  plugins: [],
};
export default config;

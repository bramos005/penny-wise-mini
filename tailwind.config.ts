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
          'custom-gradient': 'linear-gradient(#021744 10%, #1f3a73 30%, #4674b1 50%, #8fa6d8 70%, white)'
      },
      colors: {
        "custom-blue": "#245EE7",
        "custom-white": "#F8F9FD",
        "custom-gray": "#9AA6B8",
        "dash-gray": "#49586D",
        "icon-gray": "#E5E8EF",
        "trans-white": "rgba(255, 255, 255, 0.3)"
      },
      screens: {
        "900": "900px",
        "1409": "1409px",
        "500": "500px",
        "623": "623px",
        "770": "770px",
        "1358": "1358px",
        "1280": "1280px",
        "1300": "1300px",
        "1500": "1500px",
      },
    },
  },
  plugins: [],
};
export default config;

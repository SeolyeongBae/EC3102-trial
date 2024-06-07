/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard, sans-serif"],
        hakgyo: ["TTHakgyoansimYeohaengR"],
      },
    },
  },
  plugins: [],
};

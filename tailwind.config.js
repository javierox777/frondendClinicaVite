/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};

// import typography from '@tailwindcss/typography';

// export default {
//   content: ['./index.html', './src/*/.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
// plugins: [typography],
// };

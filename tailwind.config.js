module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    maxWidth: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.li-plus-li > li + li': {
          marginTop: '10px',
        },
      };
  
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
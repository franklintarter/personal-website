module.exports = {
  theme: {
    boxShadow: {
      default: "-2px 2px 6px 0 rgba(0, 0, 0, .15)"
    },
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    extend: {
      screens: {},
      colors: {
        white: "#fefefe",
        brand: "#ea3c24",
        "brand-darken": "#df2e15",
        body: "#040404"
      },
      spacing: {
        n12: "-3rem",
        n8: "-2rem",
        n4: "-1rem",
        "25": "6.25rem",
        "100": "25rem"
      }
    },
    // TODO customize
    fontFamily: {
      body: ["Montserrat", "sans-serif"],
      heading: ["Libre Baskerville", "serif"]
    }
  },
  variants: [
    "responsive",
    //   "group-hover",
    //   "focus-within",
    //   "first",
    //   "last",
    "odd",
    "even",
    "hover",
    "focus"
    //   "active",
    //   "visited",
    //   "disabled"
  ],
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        ".transition": {
          transition: "all .15s ease-in-out"
        }
      };

      addUtilities(newUtilities);
    }
  ]
};

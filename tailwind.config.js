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
        brand: "#4a36be",
        "brand-darken": "#df2e15",
        "brand-gray": "#48426b",
        "brand-light-gray": "#988cdc",
        "brand-light": "#9f97d1",
        "brand-faded": "#6a6392",
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
      sans: ["Nunito Sans", "sans-serif"],
      serif: ["Crimson Text", "serif"],
      oswald: ["Oswald", "serif"]
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
        },
        ".neo-glow": {
          // "border-radius": "45px",
          // background: "linear-gradient(145deg, #dbd9e5, #ffffff)",
          background: "F3F1FE",
          "box-shadow": "8px 8px 16px #d1cfda, -8px -8px 16px #ffffff;"
        }
        // ".neo-glow": {
        //   "border-radius": "45px",
        //   background: "#F3F1FE",
        //   "box-shadow":
        //     "inset 8px 8px 16px #d1cfda, inset -8px -8px 16px #ffffff"
        // }
      };

      // border-radius: 55px;
      // background: #F3F1FE;
      // box-shadow:  24px 24px 49px #9e9da5,
      //              -24px -24px 49px #ffffff;

      // inset 8px 8px 16px #d1cfda,
      //       inset -8px -8px 16px #ffffff;

      addUtilities(newUtilities);
    }
  ]
};

/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  theme: {
    ListStyleType: {
      square: "square",
      roman: "upper-roman",
      decimal: "decimal"
    },
    extend: {
      fontFamily: {},
      colors: {
        nuxt: {
          gray: "#2F495E",
          lightgreen: "#00C58E",
          green: "#108775",
        },
        primary: {
          base: "#00C58E",
          light: "#00E0A1",
          dark: "#07A377",
        },
        light: {
          surface: "#F8FAFC",
          onSurfacePrimary: "#2F495E",
          onSurfaceSecondary: "#606F7B",
          // elevatedSurface: defaultTheme.colors.white,
          // border: defaultTheme.colors.gray['300']
        },
        dark: {
          surface: "#2C3E50",
          onSurfacePrimary: "#F5F7FA",
          onSurfaceSecondary: "#B8C2CC",
          elevatedSurface: "#2F495E",
          // border: defaultTheme.colors.gray['600']
        },
      },
    },
  },
  variants: {},
  plugins: [],
}

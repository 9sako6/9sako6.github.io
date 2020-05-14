/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  corePlugins: {
    // preflight: false,
    container: false
  },
  theme: {
    ListStyleType: {
      square: 'square',
      roman: 'upper-roman',
      decimal: 'decimal'
    },
    extend: {
      fontFamily: {
        sans: [
          'Quicksand',
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
        ]
      },
    }
  },
  variants: {},
  plugins: []
}

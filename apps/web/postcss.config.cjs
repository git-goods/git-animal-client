module.exports = {
  plugins: {
    // PandaCSS + Tailwind 공존 (PR0). tailwind가 먼저 @tailwind 지시문을 펼치고,
    // panda가 자기 @layer를 처리한 뒤, autoprefixer가 마지막에 접두사를 붙인다.
    tailwindcss: {},
    '@pandacss/dev/postcss': {},
    autoprefixer: {},
  },
}
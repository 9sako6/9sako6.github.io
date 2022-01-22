/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net", "picsum.photos"],
  },
  env: {
    siteTitle: "腐ったコロッケ",
    siteDescription: "Webアプリケーション開発者くさころの技術ブログ。",
  },
};

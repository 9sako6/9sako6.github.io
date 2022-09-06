/** @type {import('next').NextConfig} */
const withExportImages = require("next-export-optimize-images");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    domains: ["images.ctfassets.net", "picsum.photos"],
  },
  env: {
    siteTitle: "腐ったコロッケ",
    siteDescription: "Webアプリケーション開発者くさころの技術ブログ。",
    siteUrl: "https://9sako6.com",
  },
};

module.exports = withBundleAnalyzer(
  withMDX(
    withExportImages({
      ...nextConfig,
      // handleImages: ["jpeg", "png", "webp", "svg"],
    })
  )
);

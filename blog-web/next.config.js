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

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    domains: ["images.ctfassets.net", "picsum.photos"],
  },
  env: {
    siteTitle: "腐ったコロッケ",
    siteDescription: "Webアプリケーション開発者くさころの技術ブログ。",
    siteUrl: "https://9sako6.com",
    MAX_COMMENT_LENGTH: 400,
  },
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer, nextRuntime }) => {
    if (isServer && nextRuntime === "nodejs") {
      require("./src/scripts/generate-topics-json.js");
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(
  withMDX(
    withExportImages({
      ...nextConfig,
    })
  )
);

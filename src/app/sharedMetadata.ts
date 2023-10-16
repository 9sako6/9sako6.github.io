export const defaultOpenGraph = {
  type: "website",
  url: process.env.siteUrl,
  title: process.env.siteTitle,
  description: process.env.siteDescription,
  siteName: process.env.siteTitle,
  images: [
    {
      url: `${process.env.siteUrl}/icon.webp`,
    },
  ],
};

export const defaultTwitter = {
  card: "summary",
  site: "@9sako6",
  creator: "@9sako6",
  images: `${process.env.siteUrl}/icon.webp`,
};

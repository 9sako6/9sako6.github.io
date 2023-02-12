export default function Head() {
  return (
    <>
      <title>{process.env.siteTitle}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={process.env.siteTitle} />
      <meta
        name="twitter:image"
        content={new URL("/icon.webp", process.env.siteUrl).href}
      />
      <meta name="twitter:creator" content="@9sako6" />
      <meta name="description" content={process.env.siteDescription} />
      <meta property="og:title" content={process.env.siteTitle} />
      <meta property="og:description" content={process.env.siteDescription} />
      <meta
        property="og:image"
        content={new URL("/icon.webp", process.env.siteUrl).href}
      />
      <meta property="og:url" content={process.env.siteUrl} />
    </>
  );
}

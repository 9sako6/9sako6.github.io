import openGraphScraper, {
  OpenGraphProperties,
  OpenGraphImage,
} from "open-graph-scraper";

const getOgp = async (url: string) => {
  return openGraphScraper({
    url,
    // @ts-ignore
    downloadLimit: 5000000, // 5MB
    onlyGetOpenGraphInfo: true,
    headers: {
      "user-agent": "Googlebot/2.1 (+http://www.google.com/bot.html)",
    },
  })
    .then((data) => {
      if (!data.result.success) return;
      return data.result;
    })
    .catch((error) => {
      console.log(error);
    });
};

type Ogp = OpenGraphProperties & {
  ogImage?: OpenGraphImage | OpenGraphImage[] | undefined;
  success: true;
};

export const getOgpAll = async (urls: string[]) => {
  const ogps: Ogp[] = [];
  await Promise.all(urls.map((url) => getOgp(url))).then((ogpData) => {
    ogpData.forEach((ogp) => {
      if (ogp) ogps.push(ogp);
    });
  });

  return ogps;
};

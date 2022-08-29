import { JSDOM } from "jsdom";
import { getOgpAll } from "@/lib/get-ogp";

export const withOgpCard = async (html: string) => {
  const jsdom = new JSDOM();
  const parser = new jsdom.window.DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const urls: string[] = [];
  doc.querySelectorAll("a").forEach((anchor) => {
    if (anchor.href === anchor.innerHTML) urls.push(anchor.href);
  });

  const ogps = await getOgpAll(urls);

  doc.querySelectorAll("a").forEach((anchor) => {
    if (anchor.href === anchor.innerHTML) {
      const ogp = ogps.find((o) => o.requestUrl === anchor.href);

      if (!ogp) return;

      const { ogImage } = ogp;
      const image = Array.isArray(ogImage) ? ogImage[0] : ogImage;
      const title = !ogp.ogTitle ? "" : ogp.ogTitle;
      const description = !ogp.ogDescription ? "" : ogp.ogDescription;
      const card = `<div>
          <div class="og-card">
            <img class="og-card-img" src="${image?.url}"></img>
            <div class="og-card-text">
              <div class="og-card-title">${title}</div>
              <div class="og-card-description">${description}</div>
            </div>
          </div>
        </div>
        `;
      anchor.innerHTML = card;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.setAttribute("style", "text-decoration: none;");
      anchor.innerHTML = card;
    }
  });

  return doc.documentElement.innerHTML;
};

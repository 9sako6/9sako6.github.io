import { generateHtmlForOgImage } from "@/lib/generate-html-for-og-image";
import { getAllPosts } from "@/lib/get-all-posts";
import { OG_IMAGE_PATH } from "@/lib/path";
import { chromium } from "playwright";

// https://kaydee.net/blog/open-graph-image/#:~:text=To%20add%20the%20OG%20image,1200%20pixels%20by%20630%20pixels.
const WIDTH = 1200;
const HEIGHT = 630;

const generateOgImage = async ({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
  });

  const page = await context.newPage();
  await page.setContent(generateHtmlForOgImage({ title }), {
    waitUntil: "load",
  });

  await page.screenshot({
    path: `public/${OG_IMAGE_PATH({ slug })}`,
    fullPage: true,
  });
  await browser.close();
};

export const generateOgImages = async () => {
  const posts = await getAllPosts({ draft: false });

  for (const post of posts) {
    await generateOgImage({ slug: post.slug, title: post.title });
  }
};

generateOgImages();

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from 'remark-gfm'
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAnchorHeading from "./rehype-anchor-heading";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeStringify from "rehype-stringify";
import { withMermaid } from "./mermaid";

export const markdownToHtml = withMermaid(async (markdown: string) => {
  return (
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAnchorHeading)
      .use(rehypeKatex)
      .use(rehypePrism)
      .use(rehypeStringify)
      .process(markdown)
  ).toString();
});

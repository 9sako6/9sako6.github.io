import { readFile } from "fs/promises";
import matter from "gray-matter";
import { array, boolean, object, optional, parse, string } from "valibot";

type Params = {
  filePath: string;
};

const PostSchema = object({
  content: string(),
  data: object({
    title: string(),
    description: string(),
    date: string(),
    topics: array(string()),
    category: string(),
    published: boolean(),
    eyecatch: optional(string()),
  }),
});

export const getMarkdownObject = async ({ filePath }: Params) => {
  const file = await readFile(filePath, "utf-8");

  return parse(PostSchema, matter(file));
};

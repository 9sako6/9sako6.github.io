import { getAllPosts } from "./get-all-posts";

type Params = {
  draft: boolean;
};

export const getAllTags = async ({ draft }: Params): Promise<string[]> => {
  const posts = await getAllPosts({ draft });

  return [...new Set(posts.map((post) => post.topics).flat())].sort();
};

import { Post } from "@/models/post";

export const getCategorizedPosts = (posts: Post[]) => {
  const categorizedPosts: { [name: string]: Post[] } = {};

  posts.forEach((post) => {
    if (categorizedPosts[post.category]) {
      categorizedPosts[post.category].push(post);
    } else {
      categorizedPosts[post.category] = [post];
    }
  });

  const pairs = Object.entries(categorizedPosts).sort((a, b) => {
    const categoryA = a[0];
    const categoryB = b[0];

    if (categoryA === "Random") return 1;
    if (categoryB === "Random") return -1;

    if (categoryA === "Technology") return -1;
    if (categoryB === "Technology") return 1;

    return categoryA.localeCompare(categoryB);
  });

  return pairs;
};

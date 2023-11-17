import { buildPost } from "@/mocks";
import { getCategorizedPosts } from "../get-categorized-posts";

it("should partition into categorized posts", async () => {
  const TechPost1 = buildPost({ category: "Technology" });
  const TechPost2 = buildPost({ category: "Technology" });
  const RandomPost = buildPost({ category: "Random" });
  const FrontendPost = buildPost({ category: "Frontend" });

  const posts = [TechPost1, TechPost2, RandomPost, FrontendPost];

  const categorizedPosts = getCategorizedPosts(posts);

  expect(categorizedPosts).toEqual([
    ["Technology", [TechPost1, TechPost2]],
    ["Frontend", [FrontendPost]],
    ["Random", [RandomPost]],
  ]);
});

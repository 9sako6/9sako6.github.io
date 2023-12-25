import { getCategorizedPosts } from "@/lib/get-categorized-posts";
import type { Metadata } from "@/types";
import { Card } from "../features/post/Card";

export type Post = Metadata & { slug: string };

type Props = {
  posts: Post[];
};

export const TopPage = ({ posts }: Props): JSX.Element => {
  const categorizedPosts = getCategorizedPosts(posts);

  return (
    <>
      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        categorizedPosts.map((categoryAndPosts) => {
          const [category, posts] = categoryAndPosts;

          return (
            <div key={category}>
              <h1
                className="pt-10 pb-10 md:mb-10 font-mono text-lg"
                id={category}
              >
                <a href={`#${category}`}>{category}</a>
              </h1>
              {posts.map(({ slug, title, eyecatch, topics }) => (
                <Card
                  key={slug}
                  slug={slug || ""}
                  title={title || ""}
                  imageUrl={eyecatch}
                  tags={topics}
                />
              ))}
            </div>
          );
        })
      )}
    </>
  );
};

import { Card } from "@/components/features/post/Card";
import { allPosts } from "@/lib/all-posts";
import { getCategorizedPosts } from "@/lib/get-categorized-posts";

const TopPage = async () => {
  const posts = await allPosts({
    draft: process.env.NODE_ENV === "development",
  });
  const categorizedPosts = getCategorizedPosts(posts);

  return (
    <div>
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
    </div>
  );
};

export default TopPage;

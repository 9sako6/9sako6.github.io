import { PostsList } from "@/components/features/post/PostsList";
import { getAllPosts } from "@/lib/get-all-posts";
import { getCategorizedPosts } from "@/lib/get-categorized-posts";

const TopPage = async () => {
  const posts = await getAllPosts({
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
              <PostsList
                posts={posts.map((post) => ({ ...post, tags: post.topics }))}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default TopPage;

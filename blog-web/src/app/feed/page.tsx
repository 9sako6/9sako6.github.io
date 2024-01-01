import { allPosts } from "@/lib/all-posts";

const FeedPage = async () => {
  const posts = await allPosts({
    draft: process.env.NODE_ENV === "development",
  });

  return (
    <div>
      <h1>Feed</h1>
    </div>
  );
};

export default FeedPage;

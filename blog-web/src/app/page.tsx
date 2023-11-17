import { TopPage as TopPageTemplate } from "@/components/templates";
import { allPosts } from "@/lib/all-posts";

const TopPage = async () => {
  const posts = await allPosts({
    draft: process.env.NODE_ENV === "development",
  });
  return <TopPageTemplate posts={posts} />;
};

export default TopPage;

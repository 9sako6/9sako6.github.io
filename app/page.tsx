import { allPostsSync } from "@/lib/all-posts";
import { TopPage } from "@/components/templates";

export default function Home() {
  const posts = allPostsSync({ draft: process.env.NODE_ENV === "development" });

  return <TopPage posts={posts} />;
}

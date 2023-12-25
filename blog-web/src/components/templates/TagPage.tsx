import type { Post } from "@/types";
import { Card } from "../features/post/Card";
import { PageTitle } from "../ui/PageTitle";

export type Props = {
  posts: Post[];
  tag: string;
};

export const TagPage = ({ posts, tag }: Props): JSX.Element => {
  return (
    <div>
      <div className="pb-16">
        <PageTitle title={`#${tag}`} />
      </div>
      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        posts.map(({ slug, title, eyecatch, topics }) => (
          <Card
            key={slug}
            slug={slug}
            title={title}
            imageUrl={eyecatch}
            tags={topics}
          />
        ))
      )}
    </div>
  );
};

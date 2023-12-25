import type { Post } from "@/types";
import { Card } from "../features/post/Card";
import { PageTitle } from "../ui/PageTitle";

export type Props = {
  posts: Post[];
  tag: string;
};

export const TagPage = ({ posts, tag }: Props): JSX.Element => {
  const pageTitle = `${tag} - ${process.env.siteTitle}`;

  return (
    <>
      <PageTitle title={`#${tag}`} />
      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        posts.map(({ slug, title, date, eyecatch, topics }) => (
          <Card
            key={slug}
            slug={slug}
            title={title}
            createdAt={date}
            imageUrl={eyecatch}
            tags={topics}
          />
        ))
      )}
    </>
  );
};

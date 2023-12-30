import { Card } from "../Card";
import styles from "./PostsList.module.scss";

type Props = {
  posts: {
    slug: string;
    title: string;
    tags: string[];
  }[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
      {posts.length === 0 ? (
        <p>There are no posts.</p>
      ) : (
        posts.map((post) => (
          <Card
            key={post.slug}
            slug={post.slug}
            title={post.title}
            tags={post.tags}
          />
        ))
      )}
    </div>
  );
};

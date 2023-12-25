import Link from "next/link";
import styles from "./Card.module.scss";
import { PostDate } from "./PostDate";
import { Tag } from "./Tag";

type Props = {
  slug: string;
  title: string;
  createdAt: string;
  imageUrl?: string;
  tags: string[];
};

export const Card: React.FC<Props> = ({
  slug,
  title,
  createdAt,
  imageUrl,
  tags,
}: Props) => {
  const postPath = `/posts/${slug}`;
  const placeholder = (
    <Link
      href={postPath}
      className="hover:underline font-mono hidden md:block"
      aria-label={title}
    >
      <div>Read more →</div>
    </Link>
  );

  return (
    <div className="pb-4 text-left w-full md:grid md:grid-cols-8 md:gap-8">
      <div className="md:col-span-6">
        <div className="pb-3">
          <Link
            href={postPath}
            className="text-2xl hover:underline cursor-pointer dark:text-zinc-300"
            aria-label="link to the post"
          >
            {title}
          </Link>
        </div>
        <div>
          <span className="pb-4">
            {tags.map((tag) => (
              <Tag tag={tag} className="mr-4" key={tag} />
            ))}
          </span>
          <div className="pb-4 text-slate-500 dark:text-zinc-400">
            <PostDate date={new Date(createdAt)} />
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <Link href={postPath} aria-label={title}>
            <img
              src={imageUrl}
              alt={title}
              width={480}
              height={270}
              className={styles.image}
            />
          </Link>
        ) : (
          placeholder
        )}
      </div>
    </div>
  );
};

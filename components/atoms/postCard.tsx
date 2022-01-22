import Link from "next/link";
import Image from "next/image";
import { useFormattedDate } from "../../hooks";
import styles from "./PostCard.module.css";

type Props = {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  imageUrl?: string;
};

export const PostCard = ({
  slug,
  title,
  description,
  createdAt,
  imageUrl,
}: Props): JSX.Element => {
  const formattedCreatedAt = useFormattedDate(new Date(createdAt));
  const postPath = `/posts/${slug}`;

  return (
    <div className={styles.card}>
      <Link href={postPath} passHref>
        <h2>{title}</h2>
      </Link>
      <Link href={postPath} passHref>
        <p className={styles.description}>{description}</p>
      </Link>
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <Image alt={title} src={imageUrl} layout="fill" objectFit="contain" />
        </div>
      )}
      <time>{formattedCreatedAt}</time>
    </div>
  );
};

import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";
import { PostDate } from "./PostDate";
import { useEffect, useState } from "react";

type Props = {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  imageUrl?: string;
};

export const Card = ({
  slug,
  title,
  description,
  createdAt,
  imageUrl,
}: Props): JSX.Element => {
  const postPath = `/posts/${slug}`;

  return (
    <div className={styles.card}>
      <div>
        <Link href={postPath} passHref>
          <span className={styles.title}>{title}</span>
        </Link>
      </div>
      <Link href={postPath} passHref>
        <p className={styles.description}>{description}</p>
      </Link>
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <Image
            alt={title}
            src={imageUrl}
            layout="fill"
            objectFit="contain"
            priority
            placeholder={"blur"}
            blurDataURL={imageUrl}
          />
        </div>
      )}
      <PostDate date={new Date(createdAt)} />
    </div>
  );
};

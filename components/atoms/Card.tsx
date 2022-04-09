import Link from "next/link";
import Image from "next/image";
import { PostDate } from "./PostDate";

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
    <div className="pb-12 text-left w-full">
      <div className="pb-3">
        <Link href={postPath} passHref>
          <a className="text-2xl hover:underline cursor-pointer">{title}</a>
        </Link>
      </div>
      <p className="pb-3 text-gray-600 dark:text-zinc-300">{description}</p>
      {imageUrl && (
        <div className="relative h-72">
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
      <div className="text-right">
        <PostDate date={new Date(createdAt)} />
      </div>
    </div>
  );
};

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
      <div className="text-slate-500 dark:text-zinc-400">
        <div className="pb-4">
          <PostDate date={new Date(createdAt)} />
        </div>
        <p className="pb-3">{description}</p>
      </div>
      {imageUrl && (
        <div className="relative h-56 md:h-96">
          <Link href={postPath}>
            <a>
              <Image
                className="cursor-pointer rounded"
                alt={title}
                src={imageUrl}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={imageUrl}
              />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

import Link from "next/link";
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
          <a className="text-2xl hover:underline cursor-pointer dark:text-zinc-200">
            {title}
          </a>
        </Link>
      </div>
      <div className="text-slate-500 dark:text-zinc-400">
        <div className="pb-4">
          <PostDate date={new Date(createdAt)} />
        </div>
        <p className="pb-3">{description}</p>
      </div>
      {imageUrl && (
        <Link href={postPath}>
          <a>
            <img
              className="cursor-pointer rounded object-cover h-96 m-auto"
              alt={title}
              src={imageUrl}
            />
          </a>
        </Link>
      )}
    </div>
  );
};

import { Tag } from "./Tag";
import Link from "next/link";
import { PostDate } from "./PostDate";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  imageUrl?: string;
  tags: string[];
};

export const Card = ({
  slug,
  title,
  description,
  createdAt,
  imageUrl,
  tags,
}: Props): JSX.Element => {
  const postPath = `/posts/${slug}`;
  const placeholder = (
    <Link href={postPath}
      className="hover:underline font-mono hidden md:block"
      aria-label={title}
    >
      <div>Read more →</div>
    </Link >
  );

  return (
    <div className="pb-4 text-left w-full md:grid md:grid-cols-8 md:gap-8">
      <div className="md:col-span-6">
        <div className="pb-3">
          <Link href={postPath} passHref
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
          <div className="pb-3 text-slate-500 dark:text-zinc-400">
            <Link href={postPath}
              className="hover:underline" aria-label={title}>
              {description}
            </Link>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 grid place-content-center relative">
        {imageUrl ? (
          <div className="h-80 md:h-32">
            <Link href={postPath}
              aria-label={title}>
              <Image
                className="cursor-pointer rounded"
                alt={title}
                src={imageUrl}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={imageUrl}
              />
            </Link>
          </div>
        ) : (
          placeholder
        )}
      </div>
    </div>
  );
};

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
    <Link href={postPath}>
      <a
        className="hover:underline font-mono hidden md:block"
        aria-label={title}
      >
        <div>Read more →</div>
      </a>
    </Link>
  );

  return (
    <div className="pb-12 text-left w-full md:grid md:grid-cols-8 md:gap-8">
      <div className="md:col-span-6">
        <div className="pb-3">
          <Link href={postPath} passHref>
            <a className="text-2xl hover:underline cursor-pointer dark:text-zinc-200">
              {title}
            </a>
          </Link>
        </div>
        <div className="text-slate-500 dark:text-zinc-400">
          <div className="pb-4">
            {tags.map((tag) => (
              <Link href={`/tags/${tag}`} key={tag}>
                <a className="mr-4">
                  <Tag tag={tag} />
                </a>
              </Link>
            ))}
          </div>
          <div className="pb-4">
            <PostDate date={new Date(createdAt)} />
          </div>
          <div className="pb-3">
            <Link href={postPath}>
              <a className="hover:underline" aria-label={title}>
                {description}
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 grid place-content-center relative">
        {imageUrl ? (
          <div className="h-80 md:h-32">
            <Link href={postPath}>
              <a aria-label={title}>
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
        ) : (
          placeholder
        )}
      </div>
    </div>
  );
};

import { Tag } from "./Tag";
import Link from "next/link";
import { PostDate } from "./PostDate";

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
      <a className="hover:underline font-mono hidden md:block">
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
          <div className="flex gap-3 pb-4">
            {tags.map((tag) => (
              <Link href={`/tags/${tag}`} key={tag}>
                <a>
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
              <a className="hover:underline">{description}</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 grid place-content-center">
        {imageUrl ? (
          <Link href={postPath}>
            <a>
              <img
                className="rounded cursor-pointer md:max-h-48"
                alt={title}
                src={imageUrl}
              />
            </a>
          </Link>
        ) : (
          placeholder
        )}
      </div>
    </div>
  );
};

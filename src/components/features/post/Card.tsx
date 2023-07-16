import Link from "next/link";
import { PostDate } from "./PostDate";
import { Tag } from "./Tag";

type Props = {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  imageUrl?: string;
  tags: string[];
};

const MAX_DESCRIPTION_LENGTH = 100;

export const Card: React.FC<Props> = ({
  slug,
  title,
  description,
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
          <div className="pb-3 text-slate-500 dark:text-zinc-400">
            <Link
              href={postPath}
              className="hover:underline"
              aria-label={title}
            >
              {description.length < MAX_DESCRIPTION_LENGTH
                ? description
                : description.slice(0, MAX_DESCRIPTION_LENGTH).concat("...")}
            </Link>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 grid place-content-center">
        {imageUrl ? (
          <div className="md:h-32">
            <Link href={postPath} aria-label={title}>
              {/* <Image
                className="cursor-pointer rounded"
                alt={title}
                src={imageUrl}
                width={640}
                height={360}
                // placeholder="blur"
                // blurDataURL={imageUrl}
              /> */}
              <img
                src={imageUrl}
                alt={title}
                className="cursor-pointer rounded"
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

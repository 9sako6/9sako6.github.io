import Link from "next/link";
import { TagsList } from "./TagsList";

type Props = {
  slug: string;
  title: string;
  tags: string[];
};

export const Card: React.FC<Props> = ({ slug, title, tags }: Props) => {
  const postPath = `/posts/${slug}`;

  return (
    <div className="text-left w-full flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <Link
          href={postPath}
          className="text-lg md:text-xl hover:underline cursor-pointer"
          aria-label={title}
        >
          {title}
        </Link>
        <TagsList tags={tags} />
      </div>
      <Link
        href={postPath}
        className="hover:underline font-mono hidden md:block"
        aria-label={title}
      >
        Read more →
      </Link>
    </div>
  );
};

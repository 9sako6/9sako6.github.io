import Link from "next/link";

type Props = {
  tag: string;
  className?: string;
};

export const Tag = ({ tag, className }: Props): JSX.Element => (
  <Link href={`/tags/${tag}`}>
    <a>
      <div
        className={`cursor-pointer py-1 inline-block break-words text-teal-700 hover:underline focus:underline active:underline dark:text-teal-400 ${className}`}
      >
        {tag}
      </div>
    </a>
  </Link>
);

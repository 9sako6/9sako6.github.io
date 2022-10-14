import Link from "next/link";

type Props = {
  tag: string;
  className?: string;
};

export const Tag = ({ tag, className }: Props): JSX.Element => (
  <Link href={`/tags/${tag}`}>
    <a>
      <span
        className={`cursor-pointer text-teal-700 break-all hover:underline focus:underline active:underline dark:text-teal-400 ${className}`}
      >
        {tag}
      </span>
    </a>
  </Link>
);

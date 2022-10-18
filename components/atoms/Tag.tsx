import Link from "next/link";

type Props = {
  tag: string;
  className?: string;
};

export const Tag = ({ tag, className }: Props): JSX.Element => (
  <Link href={`/tags/${tag}`}>
    <a>
      <div
        className={`cursor-pointer py-2 inline-block break-words hover:underline focus:underline active:underline ${className}`}
      >
        #{tag}
      </div>
    </a>
  </Link>
);

import Link from "next/link";

type Props = {
  date: Date;
};

export const PostDate = ({ date }: Props): JSX.Element => {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return (
    <time>
      <Link href={`/archives/${year}`} passHref className="hover:underline">
        {year}年
      </Link>
      {month}月{day}日
    </time>
  );
};

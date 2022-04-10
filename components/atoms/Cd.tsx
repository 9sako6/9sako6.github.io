import Link from "next/link";

type Props = {
  href?: string;
  text?: string;
};

export const Cd = ({ href, text }: Props): JSX.Element => {
  return (
    <Link href={href || "/"}>
      <a className="font-mono hover:underline underline-offset-2">
        {text || "cd .."}
      </a>
    </Link>
  );
};

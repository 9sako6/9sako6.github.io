import Link from "next/link";

type Props = {
  href?: string;
  text?: string;
};

export const Cd = ({ href, text }: Props): JSX.Element => {
  type User = { email: string };
  const jane = { email: "jane@example.com" } satisfies User;

  return (
    <Link
      href={href || "/"}
      className="font-mono hover:underline underline-offset-2"
    >
      {text || "cd .."}
    </Link>
  );
};

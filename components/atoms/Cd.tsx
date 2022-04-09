import Link from "next/link";

export const Cd = (): JSX.Element => {
  return (
    <Link href="/">
      <a className="font-mono hover:underline underline-offset-2">cd ..</a>
    </Link>
  );
};

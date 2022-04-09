import Link from "next/link";

export const Header = (): JSX.Element => {
  return (
    <header>
      <div className="text-center text-3xl font-serif h-24 items-center flex">
        <Link href="/">
          <a className="m-auto">{process.env.siteTitle}</a>
        </Link>
      </div>
    </header>
  );
};

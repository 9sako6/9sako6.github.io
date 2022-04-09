import Link from "next/link";
import { ThemeChanger } from "../atoms/ThemeChanger";

export const Header = (): JSX.Element => {
  return (
    <header>
      <div className="text-center text-3xl font-serif items-center">
        <div className="pt-12">
          <Link href="/">
            <a>{process.env.siteTitle}</a>
          </Link>
        </div>
        <div className="pb-12">
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
};

import Link from "next/link";
import { ThemeChanger } from "@/components/atoms/ThemeChanger";
import { SiteTitle } from "@/components/atoms/SiteTitle";

export const Header = (): JSX.Element => {
  return (
    <header>
      <nav className="flex items-center pb-20 pt-20 md:max-w-2xl m-auto justify-between">
        <Link href="/">
          <a>
            <SiteTitle />
          </a>
        </Link>
        <div>
          <ThemeChanger />
        </div>
      </nav>
    </header>
  );
};

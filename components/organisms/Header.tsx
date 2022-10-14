import Link from "next/link";
import { ThemeChanger } from "@/components/atoms/ThemeChanger";
import { SiteTitle } from "@/components/atoms/SiteTitle";

export const Header = (): JSX.Element => {
  return (
    <header>
      <nav className="flex items-center pb-20 pt-20 md:max-w-5xl m-auto justify-between">
        <Link href="/">
          <a>
            <SiteTitle />
          </a>
        </Link>
        <ul className="flex md:text-2xl text-xl">
          <li>
            <ThemeChanger />
          </li>
        </ul>
      </nav>
    </header>
  );
};

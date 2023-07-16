import Link from "next/link";
import { SiteTitle } from "@/components/ui/SiteTitle";

export const Header = (): JSX.Element => {
  return (
    <header>
      <nav className="flex items-center pb-10 md:pb-20 pt-20 md:max-w-5xl m-auto justify-between">
        <Link href="/">
          <SiteTitle />
        </Link>
      </nav>
    </header>
  );
};

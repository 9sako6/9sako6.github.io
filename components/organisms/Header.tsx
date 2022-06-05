import Link from "next/link";
import { ThemeChanger } from "@/components/atoms/ThemeChanger";
import { BookmarkButton, UserButton } from "@/components/atoms";
import { SiteTitle } from "@/components/atoms/SiteTitle";
import { useAuthentication } from "@/hooks/use-authentication";

export const Header = (): JSX.Element => {
  const [authUser, , user, signIn, signOut] = useAuthentication();

  return (
    <header>
      <nav className="flex items-center pb-20 pt-20 md:max-w-2xl m-auto justify-between">
        <Link href="/">
          <a>
            <SiteTitle />
          </a>
        </Link>
        <ul className="flex md:text-2xl text-xl">
          <li className="mr-3">
            <UserButton url="/about" />
          </li>
          <li className="mr-3">
            <BookmarkButton url="/bookmarks" />
          </li>
          <li>
            <ThemeChanger />
          </li>
          {process.env.NODE_ENV === "development" && (
            <li className="text-base flex">
              {authUser && user ? (
                <p className="flex pl-2" onClick={signOut}>
                  Sign Out
                  <img className="pl-1 w-8" src={user.photoURL}></img>
                </p>
              ) : (
                <p className="pl-2" onClick={signIn}>
                  Sign In
                </p>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

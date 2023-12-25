"use client";

import topics from "@/data/topics.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tag } from "../features/post/Tag";
import { Cd } from "./Cd";
import styles from "./Footer.module.scss";
import { GitHubIcon } from "./icons/GitHubIcon";
import { TwitterIcon } from "./icons/TwitterIcon";

export const Footer = (): JSX.Element => {
  const pathname = usePathname();
  const isRootPath = pathname === "/";
  const year = new Date().getFullYear();

  return (
    <footer>
      {!isRootPath && (
        <div className="flex items-center h-20 justify-center my-20">
          <Cd text="← Back to top" />
        </div>
      )}
      {isRootPath && <div className="h-20"></div>}
      <div className="md:m-auto">
        <div className="grid md:grid-cols-4 md:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <nav className="flex gap-2 text-3xl cursor-pointer">
                <div className="hover:text-zinc-600 hover:dark:text-zinc-200 hover:scale-105">
                  <a
                    href="https://github.com/9sako6"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="link to GitHub"
                  >
                    <GitHubIcon />
                  </a>
                </div>
                <div className="hover:text-zinc-600 hover:dark:text-zinc-200 hover:scale-105">
                  <a
                    href="https://twitter.com/9sako6"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="link to Twitter"
                  >
                    <TwitterIcon />
                  </a>
                </div>
              </nav>
            </div>
            <div className="py-6 break-word">
              <p>
                Web アプリケーションの開発をして生きている
                <ruby>
                  9sako6<rp>(</rp>
                  <rt>くさころ</rt>
                  <rp>)</rp>
                </ruby>
                です。
              </p>
              <p>
                <Link href="/about" className={styles.link}>
                  私のプロフィールはこちら。
                </Link>
              </p>
            </div>
          </div>
          <div className="md:col-span-2 py-6">
            {topics.map((topic) => (
              <Tag className="mr-4" tag={topic} key={topic} />
            ))}
          </div>
        </div>
      </div>
      <div className="text-sm flex items-center justify-center text-slate-500 dark:text-zinc-400 p-12">
        &copy; {year} 9sako6
      </div>
    </footer>
  );
};

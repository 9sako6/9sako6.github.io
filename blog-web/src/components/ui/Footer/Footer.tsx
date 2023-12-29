import { ArchiveList } from "@/components/features/archive/ArchiveList";
import topics from "@/data/topics.json";
import Link from "next/link";
import { Tag } from "../../features/post/Tag";
import { GitHubIcon } from "../icons/GitHubIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { BackToTop } from "./BackToTop";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="h-40 flex justify-center items-center">
        <BackToTop />
      </div>
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
          <div className={styles.archiveListContainer}>
            <h2 className={styles.archiveListHeader}>年別アーカイブ</h2>
            <ArchiveList />
          </div>
        </div>
      </div>
      <div className="text-sm flex items-center justify-center text-slate-500 dark:text-zinc-400 p-12">
        &copy; {year} 9sako6
      </div>
    </footer>
  );
};

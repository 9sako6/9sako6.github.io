"use client";

import { usePathname } from "next/navigation";
import { Cd, Tag } from "@/components/atoms";
import { CopyrightIcon } from "@/components/icons/CopyrightIcon";
import Image from "next/image";
import Link from "next/link";
import { GitHubIcon } from "../icons/GitHubIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import topics from "@/data/topics.json";

export const Footer = (): JSX.Element => {
  const pathname = usePathname();
  const isRootPath = pathname === "/";
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="grid grid-rows-4 gap-8 md:max-w-5xl md:m-auto">
        <div className="flex items-center h-20 justify-center">
          {isRootPath ? null : <Cd text="← Back to top" />}
        </div>

        <div className="row-span-2">
          <div className="grid md:grid-cols-4 md:gap-4">
            <div className="">
              <div className="flex items-center gap-2">
                <Link href="/about">
                  <div className="w-16 h-16 relative hover:scale-105">
                    <Image
                      alt="icon"
                      className="rounded-full object-contain"
                      src={"/icon.webp"}
                      fill
                    />
                  </div>
                </Link>
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
              <p className="py-6 break-all">
                I&apos;m 9sako6, a software engineer.
                <Link
                  href="/about"
                  className="break-all hover:underline focus:underline active:underline"
                >
                  A brief resume is here.
                </Link>
              </p>
            </div>
            <div className="col-span-2 py-6">
              {topics.map((topic) => (
                <Tag className="mr-4" tag={topic} key={topic} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-sm flex items-center justify-center text-slate-500 dark:text-zinc-400 p-12">
          {year} <CopyrightIcon /> 9sako6
        </div>
      </div>
    </footer>
  );
};

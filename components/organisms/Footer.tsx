import { useRouter } from "next/router";
import { Cd, Tag } from "@/components/atoms";
import { CopyrightIcon } from "@/components/icons/CopyrightIcon";
import { AuthButton } from "../atoms/AuthButton";
import Image from "next/image";
import Link from "next/link";
import { GitHubIcon } from "../icons/GitHubIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { isDevelopment } from "@/lib/is-development";
import topics from "@/data/topics.json";

export const Footer = (): JSX.Element => {
  const router = useRouter();
  const isRootPath = router.pathname === "/";
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
                <div className="w-16 h-16 relative">
                  <Image
                    alt="icon"
                    className="rounded-full"
                    src={"/icon.webp"}
                    layout={"fill"}
                    objectFit={"contain"}
                  />
                </div>
                <nav className="flex gap-2 text-3xl cursor-pointer">
                  <div className="hover:text-zinc-600 hover:dark:text-zinc-200">
                    <a
                      href="https://github.com/9sako6"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitHubIcon />
                    </a>
                  </div>
                  <div className="hover:text-zinc-600 hover:dark:text-zinc-200">
                    <a
                      href="https://twitter.com/9sako6"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon />
                    </a>
                  </div>
                  <div className="hover:text-zinc-600 hover:dark:text-zinc-200">
                    <a
                      href="https://www.linkedin.com/in/9sako6/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkedinIcon />
                    </a>
                  </div>
                </nav>
              </div>
              <p className="py-6">
                I&apos;m 9sako6, a software engineer. A brief resume is{" "}
                <Link href="/about">
                  <a className="text-teal-700 break-all hover:underline focus:underline active:underline dark:text-teal-400">
                    here
                  </a>
                </Link>
                .
              </p>
            </div>
            <div className="col-span-2">
              <h2 className="text-lg">Tags</h2>
              <div className="">
                {topics.map((topic) => (
                  <Tag className="mr-4" tag={topic} key={topic} />
                ))}
              </div>
            </div>
            <div>{isDevelopment ? <AuthButton /> : null}</div>
          </div>
        </div>

        <div className="text-sm flex items-center justify-center text-slate-500 dark:text-zinc-600 p-12">
          {year} <CopyrightIcon /> 9sako6
        </div>
      </div>
    </footer>
  );
};

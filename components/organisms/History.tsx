import { Commit } from "@/lib/update-history";
import { PostDate } from "../atoms";
import { TimeIcon } from "../icons/TimeIcon";
import { UserIcon } from "../icons/UserIcon";

type Props = {
  commits: Commit[];
};

export const History = ({ commits }: Props): JSX.Element => (
  <details>
    <summary className="pb-2 cursor-pointer">Change log</summary>
    {commits.map(({ hash, date, author, url }) => (
      <div key={hash} className="md:flex pb-2">
        <div className="font-mono pl-2">
          <a
            href={url}
            className="cursor-pointer text-teal-600 break-all hover:underline focus:underline active:underline dark:text-teal-400"
          >
            {hash}
          </a>
        </div>
        <div className="pl-2 flex items-center">
          <span className="text-gray-400 dark:text-gray-500 pr-1">
            <UserIcon />
          </span>
          {author}
        </div>
        <div className="pl-2 flex items-center">
          <span className="text-gray-400 dark:text-gray-500 pr-1">
            <TimeIcon />
          </span>
          <PostDate date={new Date(date)} />
        </div>
      </div>
    ))}
  </details>
);

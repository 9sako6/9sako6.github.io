import { execSync } from "child_process";

type CommitFromGitLog = {
  hash: string;
  date: string;
  author: string;
};

export type Commit = CommitFromGitLog & {
  url: string;
};

export function commitHistory(filePath: string): Commit[] {
  const output = execSync(
    `git --no-pager log --no-color --pretty=format:'{"date":"%ad","hash":"%h","author":"%an"}' ${filePath}`
  ).toString();

  const commits: Commit[] = (
    JSON.parse(`[${output.replaceAll("\n", ",")}]`) as CommitFromGitLog[]
  ).map(({ hash, date, author }) => ({
    hash,
    date,
    author,
    url: `https://github.com/9sako6/9sako6.com/commit/${hash}`,
  }));

  return commits;
}

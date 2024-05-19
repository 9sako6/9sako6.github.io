import { getAllPosts } from "@/lib/get-all-posts";
import { ARCHIVE_PATH } from "@/lib/path";
import Link from "next/link";
import styles from "./ArchiveList.module.scss";

export const ArchiveList = async () => {
  const posts = await getAllPosts({
    draft: process.env.NODE_ENV === "development",
  });

  const countByYear: Map<number, number> = new Map();

  posts
    .map((post) => new Date(post.date).getFullYear())
    .filter((year) => !Number.isNaN(year))
    .forEach((year) => {
      const count = countByYear.get(year);
      if (count) {
        countByYear.set(year, count + 1);
      } else {
        countByYear.set(year, 1);
      }
    });

  const years = Array.from(countByYear.keys()).sort((a, b) => b - a);

  return (
    <ul className={styles.list}>
      {years.map((year) => (
        <li key={year}>
          <Link
            href={ARCHIVE_PATH(year)}
            className={styles.item}
          >{`${year} (${countByYear.get(year)})`}</Link>
        </li>
      ))}
    </ul>
  );
};

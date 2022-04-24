import { UserIcon } from "@/components/icons/UserIcon";
import Link from "next/link";

type Props = {
  url: string;
};

export const UserButton = ({ url }: Props) => {
  return (
    <Link href={url}>
      <a className="hover:text-teal-600 dark:hover:text-teal-400">
        <UserIcon />
      </a>
    </Link>
  );
};

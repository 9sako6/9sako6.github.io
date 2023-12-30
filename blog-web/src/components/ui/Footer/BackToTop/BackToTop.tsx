"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export const BackToTop = () => {
  const pathname = usePathname();
  const isRootPath = pathname === "/";

  return isRootPath ? null : (
    <Link className="font-mono hover:underline underline-offset-2" href="/">
      ← Back to top
    </Link>
  );
};

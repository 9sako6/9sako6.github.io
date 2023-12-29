"use client";

import { usePathname } from "next/navigation";
import { Cd } from "../../Cd";

export const BackToTop = () => {
  const pathname = usePathname();
  const isRootPath = pathname === "/";

  return isRootPath ? null : <Cd text="← Back to top" />;
};

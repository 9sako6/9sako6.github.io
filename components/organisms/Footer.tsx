import { useRouter } from "next/router";
import { Cd } from "@/components/atoms";
import { CopyrightIcon } from "@/components/icons/CopyrightIcon";

export const Footer = (): JSX.Element => {
  const router = useRouter();
  const isRootPath = router.pathname === "/";

  return (
    <div>
      <footer className="flex items-center h-20 justify-center">
        <div className="p-10">{isRootPath ? null : <Cd />}</div>
      </footer>
      <div className="text-sm flex items-center justify-center text-slate-500 dark:text-zinc-600 p-12">
        2020-Present <CopyrightIcon /> 9sako6
      </div>
    </div>
  );
};

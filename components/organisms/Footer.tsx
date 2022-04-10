import { useRouter } from "next/router";
import { Cd } from "../atoms/Cd";

export const Footer = (): JSX.Element => {
  const router = useRouter();
  const isRootPath = router.pathname === "/";

  return (
    <footer className="flex items-center h-20 justify-center">
      <div className="p-10">
        {isRootPath ? <Cd href="/about" text="cd /about" /> : <Cd />}
      </div>
    </footer>
  );
};

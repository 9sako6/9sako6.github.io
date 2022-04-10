import { ReactNode } from "react";
import { Header, Footer } from "../organisms";

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="pl-4 pr-4">
      <Header />
      <main className="flex items-center justify-center">
        <div className="md:max-w-2xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

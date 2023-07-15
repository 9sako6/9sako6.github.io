import type { NextPage } from "next";
import { ErrorPage } from "@/components/templates";

const NotFound: NextPage = () => (
  <ErrorPage status={404} message={"Not found."} />
);

export default NotFound;

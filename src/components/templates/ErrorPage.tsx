import { Layout } from "../ui/Layout";
import { PageTitle } from "../ui/PageTitle";

type Props = {
  status: number;
  message: string;
};

export const ErrorPage = ({ status, message }: Props): JSX.Element => (
  <Layout>
    <PageTitle title={String(status)} />
    <p>{message}</p>
  </Layout>
);

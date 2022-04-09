import { PostTitle } from "../atoms";
import { Layout } from "../layouts";

type Props = {
  status: number;
  message: string;
};

export const ErrorPage = ({ status, message }: Props): JSX.Element => (
  <Layout>
    <PostTitle title={String(status)} />
    <p>{message}</p>
  </Layout>
);

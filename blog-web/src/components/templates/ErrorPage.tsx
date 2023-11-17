import { PageTitle } from "../ui/PageTitle";

type Props = {
  status: number;
  message: string;
};

export const ErrorPage: React.FC<Props> = ({ status, message }) => (
  <>
    <PageTitle title={String(status)} />
    <p>{message}</p>
  </>
);

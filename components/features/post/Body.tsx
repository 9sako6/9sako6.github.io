type Props = {
  html: string;
};

export const Body = ({ html }: Props): JSX.Element => {
  return (
    <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

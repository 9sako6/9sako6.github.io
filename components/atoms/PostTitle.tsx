type Props = {
  title: string;
};

export const PostTitle = ({ title }: Props): JSX.Element => {
  return (
    <div className="text-3xl pb-12 flex items-center">
      <h1>{title}</h1>
    </div>
  );
};

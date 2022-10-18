type Props = {
  title: string;
};

export const PostTitle = ({ title }: Props): JSX.Element => {
  return (
    <div className="text-4xl pb-12 flex items-center dark:text-zinc-300">
      <h1>{title}</h1>
    </div>
  );
};

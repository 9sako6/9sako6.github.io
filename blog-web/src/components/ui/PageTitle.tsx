type Props = {
  title: string;
};

export const PageTitle = ({ title }: Props): JSX.Element => {
  return (
    <div className="text-3xl flex items-center dark:text-zinc-300">
      <h1>{title}</h1>
    </div>
  );
};

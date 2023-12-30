type Props = {
  children: string;
};

export const PageTitle = ({ children }: Props): JSX.Element => {
  return (
    <div className="text-2xl md:text-3xl flex items-center dark:text-zinc-300">
      <h1>{children}</h1>
    </div>
  );
};

type Props = {
  tag: string;
};

export const Tag = ({ tag }: Props): JSX.Element => (
  <span className="cursor-pointer text-teal-700 break-all hover:underline focus:underline active:underline dark:text-teal-400">
    {tag}
  </span>
);

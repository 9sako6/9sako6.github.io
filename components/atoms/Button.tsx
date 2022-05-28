type Props = React.ComponentPropsWithoutRef<"button">;

export const Button = (props: Props) => (
  <button
    {...props}
    className="p-2 bg-teal-500 hover:bg-teal-400 text-white rounded"
  >
    {props.children}
  </button>
);

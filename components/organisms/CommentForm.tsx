import { Button } from "../atoms";

type Props = {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (message: string) => void;
};

export const MAX_LENGTH = 400;

export const CommentForm = ({
  handleChange,
  handleSubmit,
  value,
}: Props): JSX.Element => {
  const submitWithValidation = () => {
    if (value.length === 0 || value.length > MAX_LENGTH) return;
    handleSubmit(value);
  };

  return (
    <div className="flex justify-center">
      <div className="items-center flex">
        <textarea
          className="font text-lg"
          placeholder="What are your thoughts?"
          maxLength={MAX_LENGTH}
          onChange={(event) => handleChange(event)}
          value={value}
        ></textarea>
        <Button onClick={submitWithValidation}>Submit</Button>
      </div>
    </div>
  );
};

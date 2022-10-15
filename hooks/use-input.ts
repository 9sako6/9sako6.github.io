import { useState } from "react";
import type { FormEvent } from "react";

export type HandleInput = (event: FormEvent<HTMLTextAreaElement>) => void;

export const useInput = (initialValue = "") => {
  const [input, setInput] = useState(initialValue);

  const handleInput: HandleInput = (event) => {
    setInput(event.currentTarget.value);
  };

  return [input, setInput, handleInput] as const;
};

import { ChangeEvent, Dispatch, useCallback, useState } from "react";

type ReturnType<T> = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputs: T;
  setInputs: Dispatch<T>;
};

function UseInputHooks<T>(initialData: T): ReturnType<T> {
  const [inputs, setInputs] = useState(initialData);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target; // destructuring
      setInputs((inputs) => ({
        ...inputs,
        [name]: value
      }));
    },
    [inputs]
  );

  return { onChange, inputs, setInputs };
}

export default UseInputHooks;

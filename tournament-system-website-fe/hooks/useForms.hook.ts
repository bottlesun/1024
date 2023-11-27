import { Dispatch, SetStateAction, useState } from "react";

export type UseFormsHook = {
  forms: Forms;
  setForms: Dispatch<SetStateAction<Forms>>;
};

export type Forms = {
  [key: string]: any;
};

const useFormsHook = (): UseFormsHook => {
  const [forms, setForms] = useState<Forms>({});

  return {
    forms,
    setForms
  };
};

export default useFormsHook;

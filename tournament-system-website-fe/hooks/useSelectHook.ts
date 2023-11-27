import { ChangeEvent, Dispatch, useCallback, useState } from "react";

type ReturnType<T> = {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  select: T;

  setSelect: Dispatch<T>;
};

export default function useSelectHook<T>(initialData: T): ReturnType<T> {
  // {inputs , onChange } = useCreateModal({key:value}) 로 설정
  const [select, setSelect] = useState(initialData);

  // inputs key 값을 onChange 함수 적용 부분에 name 값으로 넣어준다.
  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { value, name } = e.target;
      setSelect({
        ...select,
        [name]: value
      });
    },
    [select]
  );

  return { onChange, select, setSelect };
}

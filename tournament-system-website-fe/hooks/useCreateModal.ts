import { useCallback, useState } from "react";

export default function useCreateModal<T>(initialData: T) {
  // {open , handleOpen, handleClose} = useCreateModal({key:value}) 로 설정
  const [open, setOpen] = useState(initialData);

  /***
   * handleOpen(key) , handleClose(key)
   * key 값을 임의로 설정 후 실행
   */
  const handleOpen = useCallback(
    (target: string) => {
      setOpen({
        ...open,
        [target]: true
      });
    },
    [open]
  );

  const handleClose = useCallback(
    (target: string) => {
      setOpen({
        ...open,
        [target]: false
      });
    },
    [open]
  );

  return { open, handleOpen, handleClose, setOpen };
}

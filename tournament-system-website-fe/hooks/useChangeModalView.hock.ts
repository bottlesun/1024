import { ReactNode, useState } from "react";

const useChangeModalViewHock = () => {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<ReactNode>();
  const [modalButtonItem, setModalButtonItem] = useState<any>([]);

  return {
    modalContent,
    setModalContent,
    modalTitle,
    setModalTitle,
    modalButtonItem,
    setModalButtonItem
  };
};

export default useChangeModalViewHock;

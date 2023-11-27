import { ReactNode } from "react";
import { NextRouter } from "next/router";
import { ModalContentsProps } from "../components/atoms/modal/modal-contents.view";
import { ModalTopProps } from "../components/atoms/modal/modal-top.view";
import { ModalBottomProps } from "../components/atoms/modal/modal-bottom.view";

type useCommonListType = {
  open: any;
  handleOpen: (target: string) => void;
  handleClose: (target: string) => void;
  modalTitle: string;
  modalContent: ReactNode;
  modalButtonItem: any[];
  router: NextRouter;
  total: number;
  limit: number;
  page: number;
};

function useModalPaginationCommonPropsHook({ open, handleOpen, handleClose, modalTitle, modalContent, modalButtonItem, router, total, limit, page }: useCommonListType) {
  const openMap = {
    alert: open.alert,
    modal: open.modal
  };

  /*
   * @name executeOpen
   * @param {string} modal
   * @description openMap 에서 modal 을 찾아서 실행
   * */
  function executeOpen(modalType: "alert" | "modal") {
    return openMap[modalType];
  }

  /*
   * @name ModalLogicProps
   * @param {string} modalType
   * @description modalType 에 따라서 open, handleOpen, handleClose 를 실행
   * */
  const ModalLogicProps = (modalType: "alert" | "modal") => ({
    open: executeOpen(modalType),
    handleOpen: () => handleOpen(modalType),
    handleClose: () => handleClose(modalType)
  });

  const ModalTopProps = {
    title: modalTitle
  } as ModalTopProps;

  const ModalContentsProps = {
    textAlign: "center",
    content: modalContent
  } as ModalContentsProps;

  const ModalBottomProps = {
    buttonProps: {
      buttonItem: modalButtonItem,
      buttonPosition: {
        justifyContent: "center",
        fill: "100%"
      }
    }
  } as ModalBottomProps;

  const alertProps = {
    ModalLogicProps: ModalLogicProps("alert"),
    ModalTopProps: ModalTopProps,
    ModalContentsProps: ModalContentsProps,
    ModalBottomProps: ModalBottomProps
  };

  const modalProps = {
    ModalLogicProps: ModalLogicProps("modal"),
    ModalTopProps: ModalTopProps,
    ModalContentsProps: ModalContentsProps
  };

  const paginationProps = {
    count: Math.ceil(total / limit) <= 1 ? 1 : Math.ceil(total / limit),
    page: page,
    onChange: (e: MouseEvent, page: number) => {
      return router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: page
        }
      });
    }
  };

  return { paginationProps, modalProps, alertProps };
}

export default useModalPaginationCommonPropsHook;

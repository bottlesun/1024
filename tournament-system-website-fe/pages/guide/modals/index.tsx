import BoxTitleSeo from "../../../components/atoms/box/box-title-seo";
import React from "react";
import Layout from "../../../components/organisms/layout/layout";
import ContentHeader from "../../../components/molecules/contents/content-header";
import ModalLayoutButtonView from "../../../components/atoms/modal/modal-layout-button.view";
import { ModalTopProps } from "../../../components/atoms/modal/modal-top.view";
import BoxTextView from "../../../components/atoms/box/box-text.view";
import { ModalContentsProps } from "../../../components/atoms/modal/modal-contents.view";
import { ModalBottomProps } from "../../../components/atoms/modal/modal-bottom.view";
import useCreateModal from "../../../hooks/useCreateModal";
import { buttonGroupProps } from "../../../components/atoms/button/button-group.view";
import TableLayout from "../../../components/organisms/guide-layout/table-layout";
import ButtonView from "../../../components/atoms/button/button.view";
import ModalLayoutView from "../../../components/atoms/modal/modal-layout.view";

const Modals = () => {
  const { open, handleOpen, handleClose } = useCreateModal({ textModal: false, buttonModal: false, tableModal: false });
  const { textModal, buttonModal, tableModal } = open;

  const props = {
    ModalLogicProps: {
      open: textModal,
      handleOpen: () => handleOpen("textModal"),
      handleClose: () => handleClose("textModal")
    },
    ModalTopProps: {
      title: "제목"
    } as ModalTopProps,
    ModalContentsProps: {
      textAlign: "center",
      content: <BoxTextView text={`메시지 입니다.`} />
    } as ModalContentsProps,
    ModalBottomProps: {} as ModalBottomProps
  };

  const BottomProps = {
    ModalLogicProps: {
      open: buttonModal,
      handleOpen: () => handleOpen("buttonModal"),
      handleClose: () => handleClose("buttonModal")
    },
    ModalTopProps: {
      title: "제목2"
    } as ModalTopProps,
    ModalContentsProps: {
      textAlign: "center",
      content: <BoxTextView text={`메시지 입니다.`} />
    } as ModalContentsProps,
    ModalBottomProps: {
      buttonProps: {
        buttonItem: [
          { id: "button-1", text: "open", onClick: () => console.log("open") },
          { id: "button-2", text: "close", onClick: () => handleClose("buttonModal"), variant: "outlined" }
        ],
        buttonPosition: {
          justifyContent: "start",
          fill: "100%"
        }
      } as buttonGroupProps
    } as ModalBottomProps
  };

  const TableProps = {
    ModalLogicProps: {
      open: tableModal,
      handleOpen: () => handleOpen("tableModal"),
      handleClose: () => handleClose("tableModal")
    },
    ModalTopProps: {
      title: "table"
    } as ModalTopProps,
    ModalContentsProps: {
      textAlign: "center",
      content: <TableLayout />
    } as ModalContentsProps,
    ModalBottomProps: {
      buttonProps: {
        buttonItem: [
          { id: "button-1", text: "open", onClick: () => console.log("open") },
          { id: "button-2", text: "close", onClick: () => handleClose("tableModal"), variant: "outlined" }
        ],
        buttonPosition: {
          justifyContent: "end",
          fill: "100%"
        }
      } as buttonGroupProps
    } as ModalBottomProps
  };

  return (
    <>
      <BoxTitleSeo title={"modal"} />
      <Layout>
        <ContentHeader />
        <>
          <ButtonView text={"TextModal"} onClick={() => handleOpen("textModal")} />
          <ModalLayoutView {...props} />
        </>
        <>
          <ButtonView text={"ButtonModal"} onClick={() => handleOpen("buttonModal")} />

          <ModalLayoutButtonView {...BottomProps} />
        </>
        <>
          <ButtonView text={"TableModal"} onClick={() => handleOpen("tableModal")} />
          <ModalLayoutButtonView {...TableProps} />
        </>
      </Layout>
    </>
  );
};

export default Modals;

import React from "react";
import { Box, Modal } from "@mui/material";
import { css } from "@emotion/react";
import ModalTopView, { ModalTopProps } from "./modal-top.view";
import ModalContentsView, { ModalContentsProps } from "./modal-contents.view";

const ModalWrap = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  background: var(--bg-color);
  padding: 15px;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  //max-width: 1400px ;
`;

export type ModalLogicProps = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

type ModalLayoutProps = {
  ModalLogicProps: ModalLogicProps;
  ModalTopProps: ModalTopProps;
  ModalContentsProps: ModalContentsProps;
};

const ModalLayoutView = ({ ...props }: ModalLayoutProps) => {
  const { handleClose, open } = props.ModalLogicProps;
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box css={ModalWrap}>
          <ModalTopView {...props.ModalTopProps} onClick={handleClose} />
          <ModalContentsView {...props.ModalContentsProps} />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLayoutView;

import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import { Property } from "csstype";

const ModalContentsStyle = css`
  margin: 15px 10px;
  padding: 15px 0;
`;
export type ModalContentsProps = {
  content: ReactNode;
  textAlign: Property.TextAlign;
};
const ModalContentsView = ({ content, textAlign }: ModalContentsProps) => {
  return (
    <Box id="modal-modal-description" css={ModalContentsStyle} sx={{ textAlign: { textAlign } }}>
      {content}
    </Box>
  );
};
export default ModalContentsView;

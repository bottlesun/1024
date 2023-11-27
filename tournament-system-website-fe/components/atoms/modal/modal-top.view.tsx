import React from "react";
import { css } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";

const modalTopStyles = css`
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  border-bottom: var(--border-line);
  h2 {
    font-size: 14px;
  }
`;

export type ModalTopProps = {
  title?: string;
  onClick?: () => void;
};

const ModalTopView = ({ title, onClick }: ModalTopProps) => {
  return (
    <Box css={modalTopStyles}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {title || "모달창"}
      </Typography>
      <CloseIcon onClick={onClick} sx={{ cursor: "pointer", width: 20 }} />
    </Box>
  );
};
export default ModalTopView;

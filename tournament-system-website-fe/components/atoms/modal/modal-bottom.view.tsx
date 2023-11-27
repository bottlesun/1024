import { Box } from "@mui/material";
import ButtonGroupView, { buttonGroupProps } from "../button/button-group.view";
import React from "react";
import { css } from "@emotion/react";

const ModalBottomStyle = css`
  padding-top: 10px;
  display: flex;
  align-items: center;
  border-top: var(--border-line);
`;

export type ModalBottomProps = {
  buttonProps: buttonGroupProps;
};
const ModalBottomView = ({ buttonProps }: ModalBottomProps) => {
  return (
    <>
      <Box css={ModalBottomStyle}>
        <ButtonGroupView {...buttonProps} />
      </Box>
    </>
  );
};

export default ModalBottomView;

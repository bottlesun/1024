import { Button } from "@mui/material";
import * as React from "react";
import { css } from "@emotion/react";

const ButtonTableLinkView = ({ ...props }) => {
  const ButtonLinkStyles = css`
    text-decoration: underline;
    min-width: 40px !important;
    height: 0 !important;
    padding: 0 !important;
    :hover {
      text-decoration: underline;
      background: none !important;
    }
  `;
  return (
    <Button css={ButtonLinkStyles} {...props}>
      {props.text || props.name}
    </Button>
  );
};

export default ButtonTableLinkView;

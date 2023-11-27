import React from "react";
import { Typography } from "@mui/material";
import { css } from "@emotion/react";
import { TitleProps } from "./form-title.view";

const FormCaptionView = ({ text }: TitleProps) => {
  const captionStyle = css`
    padding: 10px;
    font-size: 12px !important;
    color: var(--text-color) !important;
    text-align: center !important;
    border: var(--border-line) !important;
    border-top: none !important;
  `;
  return (
    <Typography css={captionStyle} component={"caption"}>
      {text}
    </Typography>
  );
};
export default FormCaptionView;

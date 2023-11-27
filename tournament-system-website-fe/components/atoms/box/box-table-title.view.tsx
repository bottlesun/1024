import React from "react";
import { Typography } from "@mui/material";
import { css } from "@emotion/react";
import { SxProps } from "@mui/system";

export type BoxTableTitleProps = {
  text?: string;
  sx?: SxProps;
};
const BoxTableTitleView = ({ text, sx }: BoxTableTitleProps) => {
  const tableTitleStyle = css`
    font-weight: bold;
    padding: 15px 10px 15px 0;
    :before {
      content: "·";
      padding-right: 10px;
      padding-left: 5px;
    }
  `;
  return (
    <>
      <Typography sx={sx} css={tableTitleStyle}>
        {text}
      </Typography>
    </>
  );
};

export default BoxTableTitleView;

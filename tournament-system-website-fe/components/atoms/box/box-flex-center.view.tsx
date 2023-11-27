import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { css } from "@emotion/react";

function BoxFlexCenterView({ children }: { children: ReactNode }) {
  const FlexBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  `;
  return <Box css={FlexBox}>{children}</Box>;
}
export default BoxFlexCenterView;

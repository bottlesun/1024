import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";

export type MainMenuType = {
  open: boolean;
  icon: any;
  onClick?: () => void;
  onMouseOver?: () => void;
  text: string;
};
function CollapseMenuView({ onMouseOver, onClick, open, text, icon }: MainMenuType) {
  const iconWrap = css`
    display: flex;
    margin-right: 10px;
    width: 20px;
    .MuiSvgIcon-root {
      width: 20px;
    }
  `;
  const iconStyle = css`
    min-width: 0;
  `;
  const textWrap = css`
    span {
      font-size: 14px;
      font-weight: ${open ? "bold" : "400"};
    }
  `;
  return (
    <>
      <ListItemButton onClick={onClick}>
        <Box css={iconWrap}>
          <ListItemIcon css={iconStyle}>{icon}</ListItemIcon>
        </Box>
        <ListItemText primary={text} css={textWrap} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </>
  );
}
export default CollapseMenuView;

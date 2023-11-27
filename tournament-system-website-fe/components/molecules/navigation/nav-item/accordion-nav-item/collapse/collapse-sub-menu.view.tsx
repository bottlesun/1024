import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { itemTypes } from "../../../../../../utils/menu/menu";
import { useColorStore } from "../../../../../../stores/useColor.store";
import { Dark, Light } from "../../../../../../constants/theme";

export type subMenuTypes = {
  currentDepth?: boolean;
  open: boolean;
  subItem: itemTypes[];
};
function CollapseSubMenuView({ open, subItem }: subMenuTypes) {
  const { pathname } = useRouter();
  const colors = useColorStore((state) => state.colors);

  const subItemWrap = css`
    display: flex;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    min-height: 48px;
    padding-left: 20px;
    &.active {
      background: ${colors ? Dark.active : Light.active};
    }
  `;
  const subText = css`
    margin: 0;
    span {
      font-size: 14px;
      font-weight: 500;
    }
  `;
  const iconWrap = css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 0;
    .MuiSvgIcon-root {
      width: 20px;
    }
  `;
  const icon = css`
    min-width: 20px;
  `;

  return (
    <>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {subItem.map((item: any, index: number) => {
          return (
            <List component="div" disablePadding key={index}>
              <Link href={item.path}>
                <ListItemButton css={subItemWrap} className={item.path === pathname ? "active" : ""}>
                  <Box css={iconWrap}>
                    <ListItemIcon css={icon}>{item.icon}</ListItemIcon>
                    <ListItemText css={subText} primary={item.name} />
                  </Box>
                </ListItemButton>
              </Link>
            </List>
          );
        })}
      </Collapse>
    </>
  );
}
export default CollapseSubMenuView;

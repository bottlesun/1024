import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { css } from "@emotion/react";
import { AppBar } from "@mui/material";
import BoxHeaderLogoView from "../../../../atoms/box/box-header-logo.view";
import Box from "@mui/material/Box";
import ToolbarTop from "./toolbar-top";
import ToolbarBottom from "./toolbar-bottom";
import { depthTypes, toolbarProps } from "../../../../organisms/navigation/header-bar";
import { BrandLogoTypes } from "../../../../../utils/menu/menu";
import { ColumnToolbarProps } from "./column-toolbar-list";

type ColumnToolbarListProps = {
  colBar: toolbarProps & BrandLogoTypes;
  depth1Name: depthTypes["depth1Name"];
  depth2Name: depthTypes["depth2Name"];
  depth2: depthTypes["depth2"];
  LoadButton: ColumnToolbarProps["LoadButton"];
};
const ColumnToolbarListView = ({ ...props }: ColumnToolbarListProps) => {
  const { colBar, depth1Name, depth2Name, depth2, LoadButton } = props;

  const ToolbarWrap = css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `;

  const ToolbarProps = {
    top: {
      depth1Name
    },
    bottom: {
      depth2Name,
      depth2,
      LoadButton
    }
  };
  return (
    <AppBar position="fixed" sx={{ display: "flex" }}>
      <Toolbar>
        <BoxHeaderLogoView {...colBar} />
        <Box css={ToolbarWrap}>
          <ToolbarTop {...ToolbarProps.top} />
          <ToolbarBottom {...ToolbarProps.bottom} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default ColumnToolbarListView;

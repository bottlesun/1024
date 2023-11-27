import { NavigationTypes } from "../../molecules/navigation/navigation-list";
import Box from "@mui/material/Box";
import ContentsView from "../../molecules/contents/contents.view";
import React from "react";
import { css } from "@emotion/react";
import GlobalNavigationBar from "../navigation/global-navigation-bar";
import HeaderBar from "../navigation/header-bar";

type LayoutProps = {
  Navigation: NavigationTypes;
  Toolbar: any;
  children?: React.ReactNode;
  layout: any;
};

function LayoutView({ Navigation, children, Toolbar, layout }: LayoutProps) {
  const wrap = css`
    display: ${layout ? "grid" : "flex"};
    width: 100%;
    grid-template-columns: ${Navigation.navigationOpen ? "240px 1fr" : " 1fr"};
  `;
  //Toolbar.headerTop 는 툴바가 상단에 있는지 여부를 나타내는 값이다.

  return (
    <>
      <HeaderBar {...Toolbar} />
      <Box css={wrap}>
        {layout && <GlobalNavigationBar {...Navigation} />}
        <ContentsView>{children}</ContentsView>
      </Box>
    </>
  );
}

export default LayoutView;

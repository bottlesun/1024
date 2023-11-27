import * as React from "react";
import List from "@mui/material/List";
import CollapseMenuView, { MainMenuType } from "./collapse-menu.view";
import CollapseSubMenuView, { subMenuTypes } from "./collapse-sub-menu.view";
import { css } from "@emotion/react";

type CollapseListViewType = {
  mainMenu: MainMenuType;
  subMenu: subMenuTypes;
};
function CollapseListView({ mainMenu, subMenu }: CollapseListViewType) {
  const Props = {
    Menu: mainMenu,
    sub: subMenu
  };
  const ListWrap = css`
    width: 100%;
    padding: 0;
  `;

  return (
    <>
      <List css={ListWrap} component="nav" aria-labelledby="nested-list-subheader">
        <CollapseMenuView {...Props.Menu} />
        <CollapseSubMenuView {...Props.sub} />
      </List>
    </>
  );
}
export default CollapseListView;

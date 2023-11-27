import NavigationListView from "./navigation-list-view";
import { Drawer } from "@mui/material";
import { css } from "@emotion/react";
import { NavigationMenuTypes } from "../../../utils/menu/menu";
import { Dark, Light } from "../../../constants/theme";
import { useColorStore } from "../../../stores/useColor.store";
import { toolbarHeight } from "../../organisms/navigation/global-navigation-bar";
import { depthTypes } from "../../organisms/navigation/header-bar";

export type NavigationTypes = {
  navigationOpen: boolean | any;
  NavigationMenu: NavigationMenuTypes[];
  headerTop: boolean;
} & depthTypes;

/* 네비게이션 바 (menu) 컨텐츠 */
function NavigationList({ navigationOpen, NavigationMenu, headerTop }: NavigationTypes) {
  const colors = useColorStore((state) => state.colors);

  const drawerStyle = css`
    width: var(--drawer-width);
    .MuiDrawer-paper {
      width: var(--drawer-width);
      background: ${colors ? Dark.color : Light.color};
      margin-top: ${toolbarHeight}px;
      z-index: 10;
    }
  `;

  return (
    navigationOpen && (
      <Drawer variant="permanent" anchor="left" css={drawerStyle}>
        <NavigationListView NavigationMenu={NavigationMenu} headerTop={headerTop} />
      </Drawer>
    )
  );
}
export default NavigationList;

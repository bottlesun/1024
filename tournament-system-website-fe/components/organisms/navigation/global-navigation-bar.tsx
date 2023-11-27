import * as React from "react";
import Drawer from "@mui/material/Drawer";
import NavigationListView from "../../molecules/navigation/navigation-list-view";
import { NavigationTypes } from "../../molecules/navigation/navigation-list";

export const toolbarHeight = 100;

// 네비게이션 바 (menu) wrap
const GlobalNavigationBar = ({ navigationOpen, NavigationMenu, headerTop, depth1Name, depth2Name }: NavigationTypes) => {
  return (
    <Drawer
      sx={{
        width: `var(--drawer-width)`,
        "& .MuiDrawer-paper": {
          width: `var(--drawer-width)`,
          boxSizing: "border-box",
          marginTop: "var(--drawer-height)"
        }
      }}
      variant="persistent"
      anchor="left"
      open={navigationOpen}
    >
      <NavigationListView NavigationMenu={NavigationMenu} headerTop={headerTop} depth1Name={depth1Name} depth2Name={depth2Name} />
    </Drawer>
  );
};

export default GlobalNavigationBar;

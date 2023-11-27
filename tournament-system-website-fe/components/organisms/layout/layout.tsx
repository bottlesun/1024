import React, { useState } from "react";
import LayoutView from "./layout.view";
import { NavigationMenu } from "../../../utils/menu/menu";
import { useLayoutStore } from "../../../stores/useLayout.store";
import { useRouter } from "next/router";

function Layout({ children }: { children: React.ReactNode }) {
  const layout = useLayoutStore((state) => state.layout);

  const { pathname } = useRouter();
  const path = pathname.split("/")[1];
  const depth1 = NavigationMenu.find((v) => v.path === "/" + path);
  const depth2 = depth1?.child.find((v) => v.path === pathname);

  const [navigationOpen, setNavigationOpen] = useState(true);
  const [headerTop, setHeaderTop] = useState(false);
  const handleDrawerOpen = () => {
    setNavigationOpen(!navigationOpen);
  };

  const Props = {
    layout,
    children,
    Toolbar: {
      depth1Name: depth1?.name,
      depth2Name: depth2?.name,
      depth2,
      headerTop,
      onClick: handleDrawerOpen
    },
    Navigation: {
      depth1Name: depth1?.name,
      depth2Name: depth2?.name,
      headerTop,
      navigationOpen,
      NavigationMenu
    }
  };
  return (
    <>
      <LayoutView {...Props} />;
    </>
  );
}

export default Layout;

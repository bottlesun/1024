import CollapseListView from "./collapse-list.view";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { itemTypes } from "../../../../../../utils/menu/menu";

export type CollapseListType = {
  name: string;
  icon: any;
  child: itemTypes[];
};

function CollapseList({ name, icon, child }: CollapseListType) {
  const { pathname } = useRouter();
  const currentDepth = !!child.find((v: any) => v.path === pathname);
  const [open, setOpen] = useState(currentDepth);

  const handleClick = () => {
    setOpen(!open);
  };

  const Props = {
    mainMenu: {
      open,
      onClick: handleClick,
      text: name,
      icon: icon
    },
    subMenu: {
      currentDepth,
      open,
      subItem: child
    }
  };

  return <CollapseListView {...Props} />;
}

export default CollapseList;

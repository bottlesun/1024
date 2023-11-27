import React, { useState } from "react";
import Box from "@mui/material/Box";
import VerticalView from "./vertical.view";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { itemTypes } from "../../../../../../utils/menu/menu";
import { VerticalMenu } from "../../../../../../styles/layout";

export type NavigationMenusTypes = {
  name: string;
  icon: any;
  path?: any;
  onMouseOver: (panel: any) => void;
  onMouseOut: () => void;
  child: itemTypes[];
};
function Vertical() {
  const [hover, setHover] = useState(false);

  const handleChange = () => {
    setHover(true);
  };

  const MouseOut = () => {
    setHover(false);
  };
  const NavigationMenus: NavigationMenusTypes[] = [
    {
      name: "상품관리",
      icon: <AccessTimeOutlinedIcon />,
      path: "about",
      onMouseOver: handleChange,
      onMouseOut: MouseOut,
      child: [
        { name: "상품목록", icon: <AccessTimeOutlinedIcon />, path: "/about" },
        { name: "상품등록", icon: <AccessTimeOutlinedIcon />, path: "/" },
        { name: "상품 카테고리 관리", icon: <AccessTimeOutlinedIcon />, path: "/" },
        { name: "메인 카테고리 관리", icon: <AccessTimeOutlinedIcon />, path: "/" },
        { name: "상품 옵션 관리", icon: <AccessTimeOutlinedIcon />, path: "/" }
      ]
    },
    {
      name: "주문/배송관리",
      icon: <AccessTimeOutlinedIcon />,
      path: "about",
      onMouseOver: handleChange,
      onMouseOut: MouseOut,
      child: [
        { name: "주문 통합 관리", icon: <AccessTimeOutlinedIcon />, path: "/" },
        { name: "주문 관리", icon: <AccessTimeOutlinedIcon />, path: "/" }
      ]
    },
    {
      name: "가이드메뉴",
      icon: <AccessTimeOutlinedIcon />,
      path: "guide",
      onMouseOver: handleChange,
      onMouseOut: MouseOut,
      child: [
        { name: "테이블(Table)", icon: false, path: "/guide/tables" },
        { name: "폼필드(FormField)", icon: false, path: "/guide/forms" }
      ]
    }
  ];


  return (
    <>
      <Box css={VerticalMenu}>
        {NavigationMenus.map((item: any, index: number) => {
          const Props = {
            name: item.name,
            child: item.child,
            icon: item.icon,
            onMouseOver: item.onMouseOver,
            onMouseOut: item.onMouseOut
          };
          return <VerticalView {...Props} key={index} hover={hover} />;
        })}
      </Box>
    </>
  );
}
export default Vertical;

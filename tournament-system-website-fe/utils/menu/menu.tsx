import React from "react";
import { ImageProps } from "next/image";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export type itemTypes = {
  name: string;
  icon: any;
  path: string;
};
export type NavigationMenuTypes = {
  name: string;
  icon: any;
  path?: any;
  child: itemTypes[];
};

export type BrandLogoTypes = {
  text: string;
  url: Partial<URL["href"]>;
  img?: ImageProps;
};

const guide = {
  name: "가이드메뉴",
  icon: <AccessTimeOutlinedIcon />,
  path: "/guide",
  child: [
    { name: "테이블(Table)", icon: false, path: "/guide/tables" },
    { name: "폼필드(FormField)", icon: false, path: "/guide/forms" },
    { name: "모달필드(Modal)", icon: false, path: "/guide/modals" }
  ]
};

export const BrandLogo: BrandLogoTypes = {
  text: "토너먼트 관리자",
  url: "/instances/battle",
  img: {
    src: "",
    width: 30,
    height: 30,
    alt: "토너먼트 관리자"
  } as ImageProps
};

export const NavigationMenu: NavigationMenuTypes[] = [
  {
    name: "템플릿",
    icon: "",
    path: "/template",
    child: [
      { name: "템플릿리스트", icon: "", path: "/template/list" },
      { name: "템플릿 생성", icon: "", path: "/template/create" }
    ]
  },
  {
    name: "스케줄",
    icon: "",
    path: "/schedule",
    child: [
      { name: "스케줄 리스트", icon: "", path: "/schedule/list" },
      { name: "스케줄 생성", icon: "", path: "/schedule/create" }
    ]
  },
  {
    name: "토너먼트 인스턴스",
    icon: "",
    path: "/instances",
    child: [
      { name: "인스턴스 리스트", icon: "", path: "/instances/list" },
      { name: "인스턴스 생성", icon: "", path: "/instances/create" },
      { name: "대전 리스트", icon: "", path: "/instances/battle" }
    ]
  }
];

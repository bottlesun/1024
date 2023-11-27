import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { NavigationMenu } from "../../../utils/menu/menu";
import ContentHeaderView from "./content-header.view";

export type breadcrumbsType = {
  href: string;
  text: string;
};

const ContentHeader = () => {
  const router = useRouter();
  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathWithoutQuery = router.asPath.split("?")[0];
      const asPathNestedRoutes = asPathWithoutQuery.split("/").filter((v) => v.length > 0);


     // console.log("asPathNestedRoutes =>", asPathNestedRoutes[0]);
      /* MenuList - 지정해둔 메뉴리스트 배열에서 현재 페이지 데이터가 들어있는 객체 리스트  */
      const MenuList = NavigationMenu.filter((item) => {
        //console.log(item.path);

        return item.path === "/" + asPathNestedRoutes[0];
      });

      /* crumbList - href , name 추적 배열 */
      const crumbList = asPathNestedRoutes.map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        if (MenuList[0] === undefined) return false;
        const subMenu = MenuList[0].child.filter((item) => {
          return item.path === href;
        });

        if (subMenu[0]) return { href, text: subMenu[0].name };
        if (!subMenu[0]) return { href, text: MenuList[0].name };
      });

      return [...crumbList];
    },
    [router.asPath]
  ) as breadcrumbsType[];
  const props = {
    breadcrumbs: breadcrumbs
  };

  return <ContentHeaderView {...props} />;
};
export default ContentHeader;

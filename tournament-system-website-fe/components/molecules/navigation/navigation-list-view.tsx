import * as React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import FixedNavItemView from "./nav-item/fixed-nav-item/fixed-nav-item.view";
import CollapseList, { CollapseListType } from "./nav-item/accordion-nav-item/collapse/collapse-list";

function NavigationListView({ ...props }) {
  return (
    <>
      <Scrollbars autoHide universal autoHideTimeout={1000} autoHideDuration={300} autoHeight autoHeightMax={"100%"}>
        {props.NavigationMenu.map((item: CollapseListType, index: number) => (props.headerTop ? <CollapseList key={index} {...item} /> : <FixedNavItemView {...item} {...props} key={index} />))}
      </Scrollbars>
    </>
  );
}

export default NavigationListView;

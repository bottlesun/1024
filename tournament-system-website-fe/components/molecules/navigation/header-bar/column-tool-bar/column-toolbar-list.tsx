import ColumnToolbarListView from "./column-toolbar-list.view";
import { BrandLogo } from "../../../../../utils/menu/menu";
import { depthTypes, toolbarProps } from "../../../../organisms/navigation/header-bar";
import { ReactNode } from "react";

export type ColumnToolbarProps = {
  LoadButton: {
    text: ReactNode;
    className?: "reverse" | "";
    onClick?: () => void;
    disabled?: boolean;
  };
} & toolbarProps &
  depthTypes;
function ColumnToolbarList({ ...props }: ColumnToolbarProps) {
  // 고정 바 슬라이드 바 전환버튼
  const Props = {
    depth1Name: props.depth1Name,
    depth2Name: props.depth2Name,
    depth2: props.depth2,
    colBar: {
      onClick: props.onClick,
      headerTop: props.headerTop,
      ...BrandLogo
    },
    LoadButton: props.LoadButton
  };

  return <ColumnToolbarListView {...Props} />;
}

export default ColumnToolbarList;

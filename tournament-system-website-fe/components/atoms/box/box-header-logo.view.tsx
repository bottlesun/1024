import * as React from "react";
import Box from "@mui/material/Box";
import { css } from "@emotion/react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLayoutStore } from "../../../stores/useLayout.store";
import Link from "next/link";
import Image from "next/image";
import { BrandLogoTypes } from "../../../utils/menu/menu";

export type ToolbarOverlapTypes = {
  onClick?: () => void;
  headerTop?: boolean;
} & BrandLogoTypes;

function BoxHeaderLogoView({ ...props }) {
  const layout = useLayoutStore((state: any) => state.layout);
  const wrap = css`
    display: flex;
    width: var(--drawer-width);
    justify-content: flex-start;
    align-items: center;

    h1 {
      width: 100%;
      font-size: 20px;
      padding-left: 5px;

      a {
        font-weight: bold;
      }
    }
  `;

  const header = css`
    width: var(--drawer-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 8px 16px 8px 12px;
    min-height: var(--drawer-height);
    background: ${!props.headerTop && "var(--bg-color)"};
  `;
  return (
    <>
      <Box css={wrap}>
        <Box css={header}>
          <h1>
            <Link href={props.url}>{1 <= props.img.src.length ? <Image {...props.img} /> : props.text}</Link>
          </h1>

          {!(!props.headerTop || layout) && (
            <IconButton onClick={props.onClick}>
              {/* ltr 화살표 오른쪽  rtl은 왼쪽화살표 */}
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
}

export default BoxHeaderLogoView;

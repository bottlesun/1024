import Link from "next/link";
import React from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { Theme as MaterialUITheme } from "@mui/material/styles/createTheme";

function VerticalSubItemView({ child, hover }: any) {
  const { pathname } = useRouter();

  const SubList = (theme: MaterialUITheme) => {
    return css`
      padding: 20px 0;
      background: ${theme.palette.background.default};
      border-radius: 5px;
      box-shadow: var(--box-shadow);

      > li {
        min-width: 180px;
        box-sizing: border-box;
        border-top: var(--border-line);
        :last-child{
          border-bottom: var(--border-line);
        }
        a {
          display: block;
          padding: 12px;
          width: 100%;
          &.active {
            background: ${theme.palette.action.active};
          }
        }
      }
    `;
  };

  return (
    hover && (
      <ul css={SubList}>
        {child?.map((subItem: any, index: number) => {
          return (
            <li key={index}>
              <Link href={subItem.path} className={subItem.path === pathname ? "active" : ""}>
                {subItem.name}
              </Link>
            </li>
          );
        })}
      </ul>
    )
  );
}

export default VerticalSubItemView;

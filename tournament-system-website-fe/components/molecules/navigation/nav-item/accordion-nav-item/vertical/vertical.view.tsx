import React from "react";
import { css } from "@emotion/react";
import VerticalSubItemView from "./vertical-sub-item.view";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Theme as MaterialUITheme } from "@mui/material/styles/createTheme";

function VerticalView({ hover, onMouseOver, onMouseOut, name, child, icon }: any) {
  const MainList = (theme: MaterialUITheme) => {
    return css`
      > li {
        display: flex;
        gap: 10px;
        background: ${theme.palette.primary.main};
        padding: 12px;
        position: relative;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
          background: ${theme.palette.action.hover};

          > ul {
            visibility: ${hover ? "visible" : "hidden"};

            li:hover {
              background: ${theme.palette.action.hover};
            }
          }
        }
        ul {
          position: absolute;
          z-index: 10;
          top: 100%;
          left: 0;
        }
      }
    `;
  };

  return (
    <ul css={MainList}>
      {/*메인아이템*/}
      <li onMouseEnter={onMouseOver} onMouseLeave={onMouseOut}>
        {icon}
        <a href="components/molecules/navigation/vertical#">{name}</a>
        <ExpandMore />
        {/*서브아이템*/}
        <VerticalSubItemView child={child} hover={hover} />
      </li>
    </ul>
  );
}

export default React.memo(VerticalView);

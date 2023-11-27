import * as React from "react";
import Box from "@mui/material/Box";
import { css } from "@emotion/react";

import ButtonGroupView from "../../../../atoms/button/button-group.view";
import { Breadcrumbs, Link } from "@mui/material";
import { buttonPropsType } from "../../../../atoms/button/button.view";
import { ButtonProps } from "@mui/material/Button/Button";
import { depthTypes } from "../../../../organisms/navigation/header-bar";

type ToolbarTopView = {
  buttonGroups: { buttonItem: Partial<buttonPropsType & ButtonProps>[] };
  depth1Name: depthTypes["depth1Name"];
};
function ToolbarTopView({ ...props }: ToolbarTopView) {
  const { buttonGroups, depth1Name } = props;

  const headerView = css`
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    border-bottom: var(--border-line);
    gap: 10px;
    button {
      background: var(--bg-color);
      &:hover {
        .MuiButton-startIcon {
          transform: rotate(180deg);
          transition: all 0.4s;
        }
      }
    }
  `;
  const BreadcrumbsCss = css`
    a {
      color: var(--text-color);
      font-size: 14px;
      font-weight: 300;
      text-decoration: none;
    }
  `;
  return (
    <>
      <Box css={headerView}>
        <ButtonGroupView {...buttonGroups} />
        <Box css={BreadcrumbsCss}>
          <Breadcrumbs className={"breadcrumbs"} aria-label="breadcrumb" separator="›">
            <Link> TS – DASHBOARD</Link>
            <Link>토너먼트</Link>
            <Link>{depth1Name}</Link>
          </Breadcrumbs>
        </Box>
      </Box>
    </>
  );
}

export default ToolbarTopView;

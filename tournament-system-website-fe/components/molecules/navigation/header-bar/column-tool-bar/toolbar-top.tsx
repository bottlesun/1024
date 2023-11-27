import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { useRouter } from "next/router";
import { depthTypes } from "../../../../organisms/navigation/header-bar";
import { buttonPropsType } from "../../../../atoms/button/button.view";
import { ButtonProps } from "@mui/material/Button/Button";
import ToolbarTopView from "./toolbar-top.view";

function ToolbarTop({ depth1Name }: { depth1Name: depthTypes["depth1Name"] }) {
  const router = useRouter();
  const props = {
    depth1Name,
    buttonGroups: {
      buttonItem: [
        {
          id: "reload",
          size: "small",
          onClick: () => {
            return router.push({
              pathname: router.pathname,
              query: {}
            });
          },
          startIcon: <CachedIcon />
        }
      ]
    } as { buttonItem: Partial<buttonPropsType & ButtonProps>[] }
  };
  return <ToolbarTopView {...props} />;
}

export default ToolbarTop;

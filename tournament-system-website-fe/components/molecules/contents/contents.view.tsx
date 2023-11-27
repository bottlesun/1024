import React from "react";
import { css } from "@emotion/react";
import { layout } from "../../../styles/layout";

function ContentsView({ children }: { children: React.ReactNode }) {
  const inner = css`
    min-height: calc(100% - 120px);
    margin: 120px auto 0;
    width: 100%;
  `;
  return (
    <div css={layout}>
      <div className="inner" css={inner}>
        {children}
      </div>
    </div>
  );
}

export default ContentsView;

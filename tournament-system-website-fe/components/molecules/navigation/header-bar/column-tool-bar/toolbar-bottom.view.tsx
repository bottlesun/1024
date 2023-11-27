import Box from "@mui/material/Box";
import * as React from "react";

import { css } from "@emotion/react";
import ButtonView from "../../../../atoms/button/button.view";
import { TextField, Typography } from "@mui/material";
import ButtonSwitchesView from "../../../../atoms/button/button-switches.view";

function ToolbarBottomView({ ...props }) {
  const { depth2Name, depth2, LoadButton, switchSearchProps } = props;
  let create = depth2?.path.split("/")[2] === "create";
  let list = depth2?.path.split("/")[2] === "list";
  let battle = depth2?.path.split("/")[2] === "battle";
  const ToolbarBottomWrap = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 20px;
  `;

  const textField = css`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 50px;
    button {
      background: var(--bg-color);
      font-size: 12px;
      line-height: 40px;
    }
    .MuiInputBase-root {
      width: 200px;
      height: 40px;
      font-size: 11px;
      background: var(--bg-color);
    }
  `;
  const Title = css`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 200px;
    .MuiTypography-root {
      font-weight: 700;
      width: 150px;
      display: block;
      min-width: 100px;
      font-size: 14px;
    }
    .MuiButtonBase-root {
      font-size: 13px;
      line-height: 14px;
    }
  `;

  return (
    <>
      <Box css={ToolbarBottomWrap}>
        <Box css={Title}>
          <Typography>{depth2Name}</Typography>
          {depth2?.path.split("/")[1] !== "template" && create && <ButtonView {...LoadButton} />}
        </Box>
        {(list || battle) && (
          <Box css={textField}>
            {depth2?.path.split("/")[1] !== "template" && <ButtonSwitchesView {...switchSearchProps} />}
            {list && (
              <>
                <TextField {...props.inputProps} />
                <ButtonView {...props.searchButtonProps} />
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
export default ToolbarBottomView;

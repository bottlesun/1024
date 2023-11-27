import * as React from "react";
import Box from "@mui/material/Box";
import ButtonView, { buttonPropsType } from "./button.view";
import { ButtonProps } from "@mui/material/Button/Button";
import { Property } from "csstype";
import { css } from "@emotion/react";

export type buttonGroupProps = {
  buttonItem: Partial<buttonPropsType & ButtonProps>[];
  buttonPosition?: {
    justifyContent?: Property.JustifyContent;
    fill?: "100%" | "";
  };
};
const ButtonGroupView = ({ ...props }: buttonGroupProps) => {
  const ButtonGroupPositionStyle = css`
    width: ${props.buttonPosition?.fill};
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props.buttonPosition?.justifyContent};
  `;

  return (
    <Box css={ButtonGroupPositionStyle}>
      {props.buttonItem.map((item) => {
        return <ButtonView key={item.id} {...item} />;
      })}
    </Box>
  );
};
export default ButtonGroupView;

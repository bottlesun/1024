import React, { memo } from "react";
import { Button } from "@mui/material";
import { css } from "@emotion/react";
import { ButtonProps } from "@mui/material/Button/Button";

export type buttonPropsType = {
  text: string | number;
  className?: "reverse" | "";
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
};

export const buttonSized = {
  small: "64px",
  medium: "80px",
  large: "100%"
};
export const fontSize = {
  small: "12px",
  medium: "14px",
  large: "16px"
};

const ButtonView = ({ ...props }: Partial<buttonPropsType & ButtonProps>) => {
  const buttonStyles = css`
    text-transform: none;
    height: 40px;
    min-width: ${buttonSized[props.size || "medium"]};
    font-size: ${fontSize[props.size || "medium"]};
    .MuiSvgIcon-root {
      width: 1rem;
      height: 1rem;
    }
    .MuiButton-startIcon {
      margin: ${!props.text && "0"};
    }
    .MuiButton-endIcon {
      margin: ${!props.text && "0"};
    }
  `;
  return (
    <Button variant={props.variant || "contained"} css={buttonStyles} {...props}>
      {props.text}
    </Button>
  );
};
export default memo(ButtonView);

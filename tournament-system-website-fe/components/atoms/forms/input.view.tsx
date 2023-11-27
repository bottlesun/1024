import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { css } from "@emotion/react";

export type InputViewType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  width?: string;
  align?: string;
  readOnly?: boolean;
};
function InputView(props: InputViewType) {
  const Styles = css`
    color: var(--text-color);
    border: none;
    width: ${props.width};
    min-width: auto;
    text-align: ${props.align || "center"};
    background: transparent;
    &:focus {
      outline: none;
      color: var(--text-color);
    }
    &:disabled {
      cursor: default;
    }
  `;
  return <input css={Styles} {...props} />;
}
export default InputView;

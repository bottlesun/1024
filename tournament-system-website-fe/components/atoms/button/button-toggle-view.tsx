import React, { MouseEvent } from "react";
import { ToggleButtonProps } from "@mui/material/ToggleButton/ToggleButton";
import FormHeadView, { FormHeadProps } from "../forms/form-head.view";
import { formWrap } from "../../../styles/layout";
import { Box, FormControl, FormGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";

export type toggleButtonProps =  {
  buttonItem : ToggleButtonProps[],
  formHeadProps : FormHeadProps,
  groupValue ?: {
    value:string[],
    onChange : (event:MouseEvent<HTMLElement>, newFormats: string[]) => void
  }
}
const ButtonToggleView = ({ ...props }:toggleButtonProps) => {

  return (
    <FormControl css={formWrap}>
      <FormGroup >
        <FormHeadView {...props.formHeadProps} />
        <Box className={'formBody'}>
          <ToggleButtonGroup {...props.groupValue}>
            {
              props.buttonItem.map((button) => {
                return <ToggleButton key={button.id} {...button}>
                  {button.children}
                </ToggleButton>
              })
            }
          </ToggleButtonGroup>
        </Box>
      </FormGroup>
    </FormControl>

  );
}

export default ButtonToggleView

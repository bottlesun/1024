import * as React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { FormGroupProps } from "@mui/material/FormGroup/FormGroup";
import { FormControlLabel, Radio, Typography } from "@mui/material";
import { formWrap } from "../../../styles/layout";
import Box from "@mui/material/Box";
import FormHeadView, { FormHeadProps } from "./form-head.view";
import { checkBoxGroupsProps } from "./checkbox-group.view";

export type RadioButtonGroupViewTypes = {
  rows?: FormGroupProps["row"];
  title?: string;
  group: checkBoxGroupsProps["group"];
  onChange?: any;
  defaultValue?: string;
  formHeadProps?: FormHeadProps;
};

function RadioButtonsGroupView({ ...props }: RadioButtonGroupViewTypes) {
  return (
    <FormControl css={formWrap}>
      <Typography className={"formTitle"}>{props.title !== undefined && props.title}</Typography>

      <RadioGroup row={props.rows} value={props.defaultValue} onChange={props.onChange}>
        <FormHeadView {...props.formHeadProps} />
        <Box className={"formBody"}>
          {props.group.map((radio) => (
            <FormControlLabel key={radio.label} {...radio} control={<Radio />} />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtonsGroupView;

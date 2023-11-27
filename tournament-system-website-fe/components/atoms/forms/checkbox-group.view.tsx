import React from "react";
import FormControl from "@mui/material/FormControl";
import { formWrap } from "../../../styles/layout";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Box from "@mui/material/Box";
import FormHeadView, { FormHeadProps } from "./form-head.view";
import { FormControlLabelProps } from "@mui/material/FormControlLabel/FormControlLabel";

type checkBoxLogicTypes = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkItems: string[];
};

export type checkBoxGroupsProps = {
  group: {
    id: string;
    label: string;
    value: string;
    labelPlacement?: FormControlLabelProps["labelPlacement"];
  }[];
  formHeadProps: FormHeadProps;
};

type CheckboxGroupViewProps = checkBoxLogicTypes & checkBoxGroupsProps;

const CheckboxGroupView = ({ ...props }: CheckboxGroupViewProps) => {
  return (
    <FormControl css={formWrap}>
      <FormGroup onChange={props.onChange}>
        <FormHeadView {...props.formHeadProps} />
        <Box className={"formBody"}>
          {props.group.map((check) => (
            <FormControlLabel key={check.label} {...check} checked={props.checkItems.includes(check.id)} control={<Checkbox id={check.id} />} />
          ))}
        </Box>
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGroupView;

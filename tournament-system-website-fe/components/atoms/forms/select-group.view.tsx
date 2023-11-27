import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formWrap } from "../../../styles/layout";
import { SelectProps } from "@mui/material/Select/Select";
import { selectDataProps } from "../../../utils/commonProps/select.Props";
import { FormGroup, Stack } from "@mui/material";
import FormHeadView, { FormHeadProps } from "./form-head.view";

export type selectGroupProps = {
  optionData: selectDataProps[];
  formHeadProps?: FormHeadProps;
  defaultSelect: SelectProps;
  placeholder?: string;
  readOnly?: boolean;
};

const SelectGroupView = ({ ...props }: selectGroupProps) => {
  return (
    <FormControl css={formWrap}>
      <FormGroup>
        <FormHeadView {...props.formHeadProps} />
        <Box className={"formBody"}>
          <Stack>
            <Select onChange={props.defaultSelect?.onChange} {...props.defaultSelect} readOnly={props?.readOnly}>
              {props.optionData?.map((item) => {
                return (
                  <MenuItem key={item.name} {...item}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
        </Box>
      </FormGroup>
    </FormControl>
  );
};

export default SelectGroupView;

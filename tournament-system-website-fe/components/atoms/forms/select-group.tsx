import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectGroupView, { selectGroupProps } from "./select-group.view";
import { SelectProps } from "@mui/material/Select/Select";

const SelectGroup = ({ ...props }: selectGroupProps) => {
  const [value, setValue] = useState("0");

  const onChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const selectGroupProps = {
    optionData: props.optionData,
    placeholder: props.placeholder,
    formHeadProps: props.formHeadProps,
    defaultSelect: {
      value: value,
      onChange: onChange
    } as SelectProps
  };

  return <SelectGroupView {...selectGroupProps} />;
};

export default SelectGroup;

import React from "react";
import { Autocomplete, FormGroup, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { formWrap } from "../../../styles/layout";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { selectGroupProps } from "./select-group.view";
import FormHeadView from "./form-head.view";

const SelectMultipleView = ({ ...props }: selectGroupProps) => {
  return (
    <FormControl css={formWrap}>
      <FormGroup>
        <FormHeadView {...props.formHeadProps} />
        <Box className={"formBody"}>
          <Stack>
            <Autocomplete multiple options={props.optionData} getOptionLabel={(option) => option.name} filterSelectedOptions renderInput={(params) => <TextField {...params} placeholder={props.placeholder} />} />
          </Stack>
        </Box>
      </FormGroup>
    </FormControl>
  );
};

export default SelectMultipleView;

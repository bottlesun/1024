import { FormGroup, TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl";
import React, { memo } from "react";
import { formWrap } from "../../../styles/layout";
import Box from "@mui/material/Box";
import FormHeadView, { FormHeadProps } from "./form-head.view";

export type InputLabelProps = FormHeadProps & { errormessage?: string };
export type InputGroupProps = {
  inputItem: Partial<TextFieldProps & InputLabelProps & { formHeadProps: FormHeadProps }>[];
};
const InputGroupView = ({ ...props }: InputGroupProps) => {
  //  console.log(props);

  return (
    <FormControl css={formWrap}>
      {props.inputItem.map((item) => {
        const { formHeadProps, ...textFieldProps } = item;
        return (
          <FormGroup key={item.id}>
            <FormHeadView {...formHeadProps} />
            <Box className={"formBody"}>
              <TextField {...textFieldProps} helperText={item.error && item.errormessage} />
            </Box>
          </FormGroup>
        );
      })}
    </FormControl>
  );
};
export default memo(InputGroupView);

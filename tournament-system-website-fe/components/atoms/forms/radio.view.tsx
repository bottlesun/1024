import React from "react";
import { FormControlLabel, Radio } from "@mui/material";
import { FormControlLabelProps } from "@mui/material/FormControlLabel/FormControlLabel";

const RadioView = ({ ...props }: FormControlLabelProps) => {

  return <FormControlLabel {...props} control={<Radio />} />;
};

export default RadioView;

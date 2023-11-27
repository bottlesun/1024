import { Box } from "@mui/material";
import SelectGroupView from "../../../atoms/forms/select-group.view";
import React from "react";

function TemplateSelectView({ ...props }) {
  const { optionValue, select, width, readOnly } = props;
  return (
    <Box
      sx={{
        ".MuiFormControl-root": {
          display: "inline-block",
          width: width,
          padding: 0
        },
        ".MuiSelect-select": {
          padding: 0,
          color: ` var(--text-color);`
        },

        fieldset: { display: "none" }
      }}
    >
      <SelectGroupView {...select.selectItem} readOnly={readOnly} />
    </Box>
  );
}
export default TemplateSelectView;

import Box from "@mui/material/Box";
import { formLabel } from "../../../styles/layout";
import FormLabel from "@mui/material/FormLabel";
import * as React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export type FormHeadProps = {
  point?: boolean | string;
  labelTitle?: string;
  id?: string;
  sx?: SxProps<Theme>;
};
const FormHeadView = ({ labelTitle, point, id, sx }: FormHeadProps) => {
  return (
    <>
      {labelTitle && (
        <Box css={formLabel}>
          <FormLabel {...{ sx, component: "h3", id }}>
            {labelTitle}
            {point && <span className={"point"}>*</span>}
          </FormLabel>
        </Box>
      )}
    </>
  );
};
export default FormHeadView;

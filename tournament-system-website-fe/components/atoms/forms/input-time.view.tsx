import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import React from "react";
import { css } from "@emotion/react";

function InputTimeView({ value, onChange, text, readOnly }: any) {
  const TimeStyles = css`
    input {
      text-align: center;
      padding: 0;
      font-size: 14px;
      color: ${value?.hour() + value?.minute() + value?.second() === 0 ? "#aaa" : "#ffffff"};
    }

    span {
      font-size: 12px;
      color: #ffffff;
    }
    fieldset {
      display: none;
    }
  `;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box css={TimeStyles}>
        <TimeField value={value} onChange={onChange} format="HH:mm:ss" readOnly={readOnly} />
      </Box>
      <span>{text}</span>
    </LocalizationProvider>
  );
}

export default InputTimeView;

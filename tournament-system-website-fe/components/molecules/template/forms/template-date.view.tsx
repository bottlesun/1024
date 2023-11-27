import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import { Dayjs } from "dayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

type TemplateDateViewProps = {
  readOnly: boolean;
  date?: any;
  dateTime: Dayjs | null;
  dateChange: (newValue: Dayjs | null) => void;
};

function TemplateDateView({ ...props }: TemplateDateViewProps) {
  const { readOnly, dateTime, dateChange } = props;

  const DateStyle = css`
    width: 100%;
    .MuiInputBase-root {
      padding: 0;
    }
    input {
      width: 100%;
      text-align: center;
      padding: 5px;
    }
    fieldset {
      display: none;
    }
    button {
      display: none;
    }
  `;
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box css={DateStyle}>
          <DatePicker format="YYYY.MM.DD" views={["year", "month", "day"]} readOnly={readOnly} defaultValue={dateTime} value={dateTime} onChange={dateChange} />
        </Box>
        <Box css={DateStyle}>
          <TimeField format="HH:mm" readOnly={readOnly} defaultValue={dateTime} value={dateTime} onChange={dateChange} />
        </Box>
      </LocalizationProvider>
    </>
  );
}
export default TemplateDateView;

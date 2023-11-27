import { DatePicker, DatePickerProps, LocalizationProvider, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Badge, FormGroup } from "@mui/material";
import FormHeadView, { FormHeadProps } from "./form-head.view";
import React from "react";
import { css } from "@emotion/react";
import dayjs, { Dayjs } from "dayjs";

const containerStyle = css`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: start;
  min-height: 50px;
  .MuiFormControl-root {
    width: 200px;
  }
`;

type DateItemProps = {
  formHeadProps: FormHeadProps;
  DateItem: DatePickerProps<any>[];
  uniqueDates?: string[];
};

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], ...other } = props;
  const dayToCheck = dayjs(props.day).unix();
  const isHighlighted = highlightedDays.some((day) => dayjs(day).unix() === dayToCheck);

  return (
    <Badge key={props.day.toString()} overlap="circular" className={"date-picker-point"} badgeContent={isHighlighted ? "●" : undefined}>
      <PickersDay {...other} />
    </Badge>
  );
}

const DatePickerGroupView = ({ ...props }: DateItemProps) => {
  const highlightedDays = props?.uniqueDates ? props?.uniqueDates : [];
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormGroup css={containerStyle}>
        <FormHeadView {...props.formHeadProps} />
        {props.DateItem.map((item, index) => {
          return (
            <DatePicker
              key={index}
              {...item}
              format={"YYYY.MM.DD"}
              slots={{
                day: ServerDay
              }}
              slotProps={{
                day: { highlightedDays } as any
              }}
            />
          );
        })}
      </FormGroup>
    </LocalizationProvider>
  );
};

export default DatePickerGroupView;

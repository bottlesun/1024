import React from "react";
import TemplateDateView from "./template-date.view";

function TemplateDate({ ...props }) {
  const { readOnly, date, dateTime, setDateTime, dateChange } = props;

  const DateProps = {
    date: date,
    readOnly: readOnly,
    dateTime: dateTime,
    dateChange
  };

  return <TemplateDateView {...DateProps} />;
}
export default TemplateDate;

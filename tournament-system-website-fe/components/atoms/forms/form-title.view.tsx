import { Typography } from "@mui/material";
import React from "react";

export type TitleProps = {
  text: string
}
const FormTitleView = ({ text }:TitleProps) => {
  return <Typography className={'formTitle'}>{text}</Typography>
}
export default FormTitleView

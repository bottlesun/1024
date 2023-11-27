import { FormControlLabel, FormGroup, Switch, SwitchProps } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { css } from "@emotion/react";

const IOSSwitch = styled((props: SwitchProps) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#fff",
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
    backgroundColor: "var(--bg-color)"
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "var(--disabled-color)",
    opacity: 1
  }
}));

const SwitchesViewStyle = css`
  max-width: 150px;
  width: 100%;
`;

const ButtonSwitchesView = ({ ...props }) => {
  return (
    <FormGroup css={SwitchesViewStyle}>
      <FormControlLabel control={<IOSSwitch sx={{ mx: 1 }} {...props} />} label={props.label} />
    </FormGroup>
  );
};

export default ButtonSwitchesView;

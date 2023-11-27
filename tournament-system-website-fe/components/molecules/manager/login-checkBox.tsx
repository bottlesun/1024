import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

type LoginCheckBoxProps = {
  onForms: (key: string, value: any) => void;
};
const LoginCheckBox = ({ onForms }: LoginCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("save");
    if (storage != null) {
      setIsChecked(JSON.parse(storage));
      onForms("save", JSON.parse(storage));
    }
  }, []);

  const onChange = (event: React.SyntheticEvent, checked: boolean) => {
    setIsChecked(checked);
    onForms("save", checked);
  };

  const checkboxProps = {
    id: "save",
    name: "save",
    label: "아이디저장",
    checked: isChecked,
    onChange: onChange
  };

  return <FormControlLabel sx={{ paddingLeft: "5px" }} {...checkboxProps} control={<Checkbox />} />;
};

export default LoginCheckBox;

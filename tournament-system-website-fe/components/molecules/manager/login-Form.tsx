import React, { useEffect, useState } from "react";
import LoginFormView from "./login-Form.view";

const LoginForm = ({ ...props }) => {
  const { onInputKeyDown, onForms, error, formHelperText, forms } = props;
  const [value, setValue] = useState({ id: "", password: "" });

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (id != null) {
      setValue({ ...value, id: id.toString() });
    }
  }, []);

  useEffect(() => {
    onForms("id", value.id);
    onForms("password", value.password);
  }, [value,forms]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setValue({ ...value, [event.target.name]: event.target.value });
    onForms("id", value.id);
    onForms("password", value.password);
    // onInputChange(event);
  };


  const inputGroups = {
    inputItem: [
      { id: "id", name: "id", label: "ID", onChange: handleInputChange, onKeyDown: onInputKeyDown, errormessage: formHelperText.id, error: error.id, value: value.id },
      { id: "password", name: "password", label: "password", type: "password", autoComplete: "on", onChange: handleInputChange, onKeyDown: onInputKeyDown, errormessage: formHelperText.password, error: error.password, value: value.password }
    ]
  };

  return <LoginFormView {...inputGroups} />;
};

export default LoginForm;


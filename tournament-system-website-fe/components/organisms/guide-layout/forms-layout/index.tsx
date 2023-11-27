import React from "react";
import RadioGroupView, { RadioButtonGroupViewTypes } from "../../../atoms/forms/radio-group.view";
import InputGroupView, { InputLabelProps } from "../../../atoms/forms/input-group.view";
import ButtonGroupView from "../../../atoms/button/button-group.view";
import { Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { selectDummyData } from "../../../../utils/commonProps/select.Props";
import { selectGroupProps } from "../../../atoms/forms/select-group.view";
import { buttonPropsType } from "../../../atoms/button/button.view";
import { ButtonProps } from "@mui/material/Button/Button";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { checkBoxGroupsProps } from "../../../atoms/forms/checkbox-group.view";
import { toggleButtonProps } from "../../../atoms/button/button-toggle-view";
import FormTitleView from "../../../atoms/forms/form-title.view";
import SelectMultipleView from "../../../atoms/forms/select-multiple.view";
import SelectGroup from "../../../atoms/forms/select-group";
import ButtonToggleGroup from "../../../atoms/button/button-toggle-group";
import CheckboxGroup from "../../../atoms/forms/checkbox-group";
import { FormHeadProps } from "../../../atoms/forms/form-head.view";

type propsType = {
  radioGroups: RadioButtonGroupViewTypes;
  inputGroups: { inputItem: Partial<TextFieldProps & InputLabelProps & { formHeadProps: FormHeadProps }>[] };
  buttonGroups: { buttonItem: Partial<buttonPropsType & ButtonProps>[] };
  selectItem: selectGroupProps;
  checkBoxGroups: checkBoxGroupsProps;
  toggleButtonGroups: toggleButtonProps;
};
const FormsLayout = () => {
  const props: propsType = {
    radioGroups: {
      rows: true,
      defaultValue: "radio-1",
      group: [
        { id: "radio-1", value: "radio-1", label: "기본값(오른쪽)" },
        { id: "radio-2", value: "radio-2", label: "왼쪽", labelPlacement: "start" },
        { id: "radio-3", value: "radio-3", label: "위", labelPlacement: "top" },
        { id: "radio-4", value: "radio-4", label: "아래", labelPlacement: "bottom" }
      ],
      formHeadProps: {
        labelTitle: "title",
        point: true
      }
    },
    checkBoxGroups: {
      group: [
        { id: "checkBox-1", value: "checkBox-1", label: "기본값(오른쪽)" },
        { id: "checkBox-2", value: "checkBox-2", label: "왼쪽", labelPlacement: "start" },
        { id: "checkBox-3", value: "checkBox-3", label: "위", labelPlacement: "top" },
        { id: "checkBox-4", value: "checkBox-4", label: "아래", labelPlacement: "bottom" }
      ],
      formHeadProps: {
        labelTitle: "title",
        point: true
      }
    },
    inputGroups: {
      inputItem: [
        {
          id: "title",
          placeholder: "placeholder",
          formHeadProps: {
            labelTitle: "title",
            point: false
          }
        },
        { id: "outlined", label: "outlined" },
        { id: "filled", label: "filled", variant: "filled", error: true, errormessage: "error 입니다." },
        { id: "standard", label: "standard", variant: "standard" },
        { id: "password", label: "password", variant: "standard", type: "password" }
      ]
    },
    buttonGroups: {
      buttonItem: [
        { id: "button-1", size: "small", text: "contained", onClick: () => console.log("contained"), startIcon: <SendIcon /> },
        { id: "button-2", size: "medium", text: "outlined", onClick: () => console.log("outlined"), endIcon: <SendIcon />, variant: "outlined" },
        { id: "button-3", text: "text", onClick: () => console.log("text"), variant: "text" },
        { id: "button-4", size: "small", variant: "text", startIcon: <SendIcon /> },
        { id: "button-5", size: "medium", className: "reverse", text: "reverse" },
        { id: "button-6", size: "large", text: "disabled", disabled: true }
      ]
    },
    selectItem: {
      optionData: selectDummyData,
      placeholder: "multiple",
      formHeadProps: {
        labelTitle: "title",
        point: false
      },
      defaultSelect: {}
    },
    toggleButtonGroups: {
      formHeadProps: {
        labelTitle: "title",
        point: true
      },
      buttonItem: [
        { id: "text", children: "text", value: "text" },
        { id: "value", children: "value", value: "value" },
        { id: "text2", children: "text2", value: "text2" },
        { id: "disabled", children: "disabled", value: "disabled", disabled: true }
      ]
    }
  };
  return (
    <Box>
      <FormTitleView text={"[radio]"} />
      <RadioGroupView {...props.radioGroups} />

      <hr className={"hr"} />

      <FormTitleView text={"[checkbox]"} />
      <CheckboxGroup {...props.checkBoxGroups} />
      <hr className={"hr"} />

      <FormTitleView text={"[toggleButton]"} />
      <ButtonToggleGroup {...props.toggleButtonGroups} />
      <hr className={"hr"} />

      <FormTitleView text={"[input]"} />
      <InputGroupView {...props.inputGroups} />

      <hr className={"hr"} />

      <FormTitleView text={"[Select]"} />
      <Box sx={{ gap: "10px", display: "flex", flexDirection: "column" }}>
        <SelectMultipleView {...props.selectItem} />
        <SelectGroup {...props.selectItem} />
      </Box>

      <hr className={"hr"} />

      <FormTitleView text={"[Button]"} />
      <ButtonGroupView {...props.buttonGroups} />
      <hr className={"hr"} />
    </Box>
  );
};
export default FormsLayout;

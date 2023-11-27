import React, { MouseEvent, useState } from "react";
import ButtonToggleView, { toggleButtonProps } from "./button-toggle-view";

const ButtonToggleGroup = ({ ...props }:toggleButtonProps) => {
  const [formats, setFormats] = useState(() => ['']);

  const handleFormat = (
    event: MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  const buttonToggleProps = {
    ...props,
    groupValue :{
      onChange: handleFormat,
      value : formats
    }
  }

  return <ButtonToggleView {...buttonToggleProps} />
}

export default ButtonToggleGroup

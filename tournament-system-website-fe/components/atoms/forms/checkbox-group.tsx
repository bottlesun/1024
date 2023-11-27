import React, { useState } from "react";
import CheckboxGroupView, { checkBoxGroupsProps } from "./checkbox-group.view";

const CheckboxGroup = ({...props}:checkBoxGroupsProps) => {

  const [checkItems, setCheckItems] = useState<string[]>([]);
  const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (checkItems.includes(target.id)) {
      setCheckItems(checkItems.filter((item) => item !== target.id));
      return;
    }
    setCheckItems([...checkItems, target.id]);
  };

  const checkBoxGroupProps = {
   ...props,
    onChange : onChecked,
    checkItems: checkItems,
  }

  return <CheckboxGroupView {...checkBoxGroupProps}/>

}

export default CheckboxGroup

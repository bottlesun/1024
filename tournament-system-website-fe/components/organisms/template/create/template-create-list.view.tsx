import BoxFlexCenterView from "../../../atoms/box/box-flex-center.view";
import * as React from "react";
import ButtonView from "../../../atoms/button/button.view";
import TemplateTableDefault from "../../../molecules/template/create/template-table-default";

function TemplateCreateListView({ ...props }) {
  return (
    <>
      <TemplateTableDefault {...props.defaultConfig} />
      <BoxFlexCenterView>
        <ButtonView {...props.AdditionConfig.button} />
      </BoxFlexCenterView>
    </>
  );
}

export default TemplateCreateListView;

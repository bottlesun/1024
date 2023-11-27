import BoxFlexCenterView from "../../../atoms/box/box-flex-center.view";
import ButtonView from "../../../atoms/button/button.view";
import * as React from "react";
import ScheduleTableDefault from "../../../molecules/schedule/create/schedule-table-default";

function InstancesCreateView({ ...instances }) {
  return (
    <>
      <ScheduleTableDefault {...instances.defaultConfig} />
      {/*<InstancesTableAddition {...instances.AdditionConfig} />*/}
      <BoxFlexCenterView>
        <ButtonView {...instances.AdditionConfig.button} />
      </BoxFlexCenterView>
    </>
  );
}
export default InstancesCreateView;

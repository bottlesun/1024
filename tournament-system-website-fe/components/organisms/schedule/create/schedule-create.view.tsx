import BoxFlexCenterView from "../../../atoms/box/box-flex-center.view";
import ButtonView from "../../../atoms/button/button.view";
import * as React from "react";
import ScheduleTableDefault from "../../../molecules/schedule/create/schedule-table-default";

function ScheduleCreateView({ ...schedule }) {
  return (
    <>
      <ScheduleTableDefault {...schedule.defaultConfig} />
      <BoxFlexCenterView>
        <ButtonView {...schedule.AdditionConfig.button} />
      </BoxFlexCenterView>
    </>
  );
}
export default ScheduleCreateView;

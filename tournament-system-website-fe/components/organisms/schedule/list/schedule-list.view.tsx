import ScheduleTableList, { scheduleListPropsDataType } from "../../../molecules/schedule/list/schedule-table-list";

function ScheduleListView({ ...props }: scheduleListPropsDataType) {
  return <ScheduleTableList {...props} />;
}
export default ScheduleListView;

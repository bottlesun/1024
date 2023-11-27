import React from "react";
import InstancesTableList, { instancesListPropsType } from "../../../molecules/instances/list/instances-table.list";

function InstancesListView({ ...props }: instancesListPropsType) {
  return <InstancesTableList {...props} />;
}
export default InstancesListView;

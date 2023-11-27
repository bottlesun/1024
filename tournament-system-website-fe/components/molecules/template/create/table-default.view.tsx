import React from "react";
import TableLayoutView, { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import TableHeadView from "../../../atoms/tables/table-head.view";
import TableBodyNotNumberView from "../../../atoms/tables/table-body-not-number.view";

function TableDefaultView({ table }: { table: { tableProps: TableLayoutProps } }) {
  return (
    <>
      <TableLayoutView {...table.tableProps}>
        <TableHeadView {...table.tableProps} />
        <TableBodyNotNumberView {...table.tableProps} />
      </TableLayoutView>
    </>
  );
}

export default TableDefaultView;

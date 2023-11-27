import TableLayoutView from "../../../atoms/tables/tableLayout.view";
import Box from "@mui/material/Box";
import React from "react";
import TableHeadView from "../../../atoms/tables/table-head.view";
import TemplateListBodyView from "../forms/template-list-body.view";

function TemplateTableListView({ ...props }) {
  const { table, footerBody } = props;
  return (
    <Box sx={{ ".MuiTableCell-root": { padding: "0 5px", boxSizing: "border-box" } }}>
      <TableLayoutView {...table.tableProps}>
        <TableHeadView {...table.tableProps} />
        <TemplateListBodyView {...table.tableProps} {...footerBody} />
      </TableLayoutView>
    </Box>
  );
}
export default TemplateTableListView;

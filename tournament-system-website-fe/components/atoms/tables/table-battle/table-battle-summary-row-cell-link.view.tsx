import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { TableBorder, TableCellProps } from "./table-battle-summary-row-cell.view";
import ButtonTableLinkView from "../../button/button-table-link.view";

const TableBattleSummaryRowCellLinkView = ({ ...props }: TableCellProps) => {
  return (
    <TableRow>
      <TableCell css={TableBorder} sx={{ borderBottom: "none!important" }} align={"center"}>
        {typeof props.value === "string" ? props.value : <ButtonTableLinkView onClick={props.onClick} name={props.value + "명"} />}
      </TableCell>
    </TableRow>
  );
};

export default TableBattleSummaryRowCellLinkView;

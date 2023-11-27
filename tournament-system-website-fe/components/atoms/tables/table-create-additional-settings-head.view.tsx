import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableCell } from "@mui/material";
import * as React from "react";

export type TableHeadType = {
  id: number;
  headerName: string;
  align: string;
  width: string;
};
function TableCreateAdditionalSettingsHeadView({ tableHead }: { tableHead: TableHeadType[] }) {
  return (
    <>
      <TableHead>
        <TableRow>
          {tableHead?.map((th: TableHeadType) => (
            <TableCell key={th.id} sx={{ width: th.width, textAlign: th.align, padding: "3px" }}>
              {th.headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}
export default TableCreateAdditionalSettingsHeadView;

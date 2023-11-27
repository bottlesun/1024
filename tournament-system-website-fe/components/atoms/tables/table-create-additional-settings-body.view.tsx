import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { TableCell } from "@mui/material";
import * as React from "react";

export type TableBodyType = {
  data: any;
  align: string;
  width?: any;
};
function TableCreateAdditionalSettingsBodyView({ tableBody }: { tableBody: TableBodyType[] }) {
  return (
    <>
      <TableBody>
        <TableRow>
          {tableBody.map((td: TableBodyType, index: number) => (
            <TableCell key={index} sx={{ width: td.width, textAlign: td.align, padding: "10px" }}>
              {td.data}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </>
  );
}
export default TableCreateAdditionalSettingsBodyView;

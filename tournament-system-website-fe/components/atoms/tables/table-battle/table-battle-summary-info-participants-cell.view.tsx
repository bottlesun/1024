import React from "react";
import { Table, TableCell } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableBattleSummaryRowCellView from "./table-battle-summary-row-cell.view";

type tableBodyProps = {
  tr: {
    total_participant_count: number | string | React.ReactNode;
    join_count: number | string | React.ReactNode;
    progress_count: number | string | React.ReactNode;
    jumped_in_count: number | string | React.ReactNode;
    done_count: number | string | React.ReactNode;
    need_count: number | string | React.ReactNode;
  };
};
const TableBattleSummaryInfoParticipantsCellView = ({ tr }: tableBodyProps) => {
  // console.log(tr);
  return (
    <>
      {Object.values(tr).map((item: any, num) => {
        return (
          <TableCell key={num} sx={{ padding: "0!important" }}>
            <Table sx={{ minWidth: "100%!important" }}>
              <TableBody component={"tbody"}>
                <TableBattleSummaryRowCellView bg value={item.total_participant_count} />
                <TableBattleSummaryRowCellView value={item.join_count} />
                <TableBattleSummaryRowCellView bg value={item.progress_count} />
                <TableBattleSummaryRowCellView value={item.jumped_in_count} />
                <TableBattleSummaryRowCellView bg value={item.done_count} />
                <TableBattleSummaryRowCellView value={item.need_count} />
              </TableBody>
            </Table>
          </TableCell>
        );
      })}
    </>
  );
};

export default TableBattleSummaryInfoParticipantsCellView;

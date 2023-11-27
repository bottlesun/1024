import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

export type TableBattleResultInfoUserListCellViewProps = {
  itemList: {
    user_id: string;
    win_amount: string | number;
  }[];
  no: number;
};
const TableBattleResultInfoUserListCellView = (props: TableBattleResultInfoUserListCellViewProps) => {
  // console.log(props.itemList, "props");

  return (
    <>
      {[props.itemList].map((item, index) => {
        return (
          <TableCell key={index} sx={{ padding: "0!important", border: "none!important", background: "none!important" }}>
            <Table sx={{ minWidth: "100%!important", minHeight: "40px!important" }}>
              <TableBody component={"tbody"}>
                <>
                  {item.map((td: any, number) => {
                    return (
                      <TableRow key={"td " + "-" + number + index} sx={{ padding: "0!important", border: "none!important", background: "none!important" }}>
                        <TableCell sx={{ padding: "0!important", textAlign: "center" }}>{td[props.no]}</TableCell>
                      </TableRow>
                    );
                  })}
                </>
              </TableBody>
            </Table>
          </TableCell>
        );
      })}
    </>
  );
};
export default TableBattleResultInfoUserListCellView;

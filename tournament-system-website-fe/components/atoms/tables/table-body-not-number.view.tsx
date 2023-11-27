import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import { TableLayoutProps } from "./tableLayout.view";
import FormCaptionView from "../forms/form-caption.view";
import { tableAddCellArray } from "../../../utils/public/tableAddCellArray";

export type tableBodyProps = {
  rows: TableLayoutProps["rows"];
  onChecked?: TableLayoutProps["onChecked"];
  checkItems?: TableLayoutProps["checkItems"];
  cols: TableLayoutProps["cols"];
};
const TableBodyNotNumberView = ({ ...props }: tableBodyProps) => {
  return (
    <>
      {props.rows.length !== 0 ? (
        <TableBody>
          {props.rows.map((tr, num) => {
            return (
              <TableRow hover selected={props.checkItems?.includes(String(Object.keys(tr)[0]))} key={"th" + num} style={{ width: "100%" }}>
                {tableAddCellArray(props.cols).map((td, number) => {
                  return (
                    <TableCell key={"td" + number} {...td} rowSpan={1} colSpan={1} sx={{ width: td.width, maxWidth: td.max }}>
                      {Object.values(tr)[number] as JSX.Element}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      ) : (
        <FormCaptionView text={"데이터가 없습니다."} />
      )}
    </>
  );
};

export default TableBodyNotNumberView;

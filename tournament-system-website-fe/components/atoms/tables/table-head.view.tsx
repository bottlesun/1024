import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import { TableLayoutProps } from "./tableLayout.view";
import { Checkbox } from "@mui/material";

type createCols = {
  cols: TableLayoutProps["cols"];
  rows: TableLayoutProps["rows"];
  onSelectAllChecked?: TableLayoutProps["onChecked"];
  checkItems?: TableLayoutProps["checkItems"];
};
const TableHeadView = ({ ...props }: createCols) => {
  return (
    <TableHead>
      <TableRow component={"tr"}>
        {props.cols.length !== 0 &&
          props.cols.map((th, index) => {
            //console.log("props.checkItems", props.checkItems);
            return (
              <TableCell key={index} {...th} className={th.padding === "checkbox" ? "checkbox" : ""} sx={{ minWidth: th.width, width: th.width }}>
                {th.padding === "checkbox" ? <Checkbox onChange={props.onSelectAllChecked} checked={props.checkItems?.length === props.rows.length} /> : th.name}
              </TableCell>
            );
          })}
      </TableRow>
      <TableRow component={"tr"}>
        {props.cols.map((th, index) => {
          return (
            th.subcols &&
            th.subcols.map((subTh, index) => (
              <TableCell key={"sub" + index} padding={"none"} {...subTh} sx={{ minWidth: subTh.width }}>
                {subTh.name}
              </TableCell>
            ))
          );
        })}
      </TableRow>
    </TableHead>
  );
};
export default TableHeadView;

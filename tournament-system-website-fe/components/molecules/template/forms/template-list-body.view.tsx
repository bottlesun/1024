import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { tableAddCellArray } from "../../../../utils/public/tableAddCellArray";
import TableCell from "@mui/material/TableCell";
import { Checkbox } from "@mui/material";
import FormCaptionView from "../../../atoms/forms/form-caption.view";
import React from "react";
import Link from "next/link";
import { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import { tableColsLength } from "../../../../utils/public/tableColsLength";

type TemplateListTypes = {
  rows: TableLayoutProps["rows"];
  onChecked?: TableLayoutProps["onChecked"];
  checkItems?: TableLayoutProps["checkItems"];
  cols: TableLayoutProps["cols"];
  length: number;
  footerHref: string;
  footerText: string;
};
function TemplateListBodyView({ ...props }: TemplateListTypes) {
  return (
    <>
      {props.rows ? (
        <TableBody>
          {props.rows.map((tr, num) => {
            return (
              <TableRow className={tr.state === "완료" ? "done-table" : ""} hover selected={props.checkItems?.includes(String(Object.keys(tr)[0]))} key={"th" + num} css={{ width: "100%" }}>
                {tableAddCellArray(props.cols).map((td, number) => {
                  return (
                    <TableCell key={"td" + number} {...td} rowSpan={1} colSpan={1} sx={{ minWidth: td.width }}>
                      {!(td.padding === "checkbox") ? (Object.values(tr)[number] as JSX.Element) : <Checkbox id={String(Object.keys(tr)[0] + num)} onChange={props.onChecked} checked={props.checkItems?.includes(String(Object.keys(tr)[0] + num))} />}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <TableRow sx={{ height: 50, ".MuiTableCell-root": { textAlign: "center" } }}>
            <TableCell>{props.length + 1}</TableCell>
            <TableCell colSpan={tableColsLength(props.cols)}>
              <Link href={props.footerHref}>+ {props.footerText}</Link>
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <FormCaptionView text={"데이터가 없습니다."} />
      )}
    </>
  );
}
export default TemplateListBodyView;

import React, { Dispatch } from "react";
import { TableLayoutProps } from "../tableLayout.view";
import { TableBody, TableCell, TableRow } from "@mui/material";
import FormCaptionView from "../../forms/form-caption.view";
import { tableAddCellArray } from "../../../../utils/public/tableAddCellArray";
import TableBattleResultInfoUserListCellView from "./table-battle-result-info-userList-cell.view";

export type tableBodyProps = {
  rows: TableLayoutProps["rows"];
  onChecked?: TableLayoutProps["onChecked"];
  checkItems?: TableLayoutProps["checkItems"];
  cols: TableLayoutProps["cols"];
  setOpen?: Dispatch<any>;
  onClick?: () => void;
};

const TableBattleResultInfoBodyView = ({ ...props }) => {
  return (
    <>
      {props.rows.length !== 0 ? (
        <TableBody component={"tbody"}>
          {[...props.rows].map((tr, num) => {
            // 단계 , 방번호, 날짜, 시간
            return (
              <TableRow hover key={"tr" + num} style={{ width: "100%" }}>
                {Object.keys(tr)
                  .filter((item, number) => "userList" !== item)
                  .map((td, number) => {
                    return (
                      <TableCell key={"td " + "-" + number} {...tableAddCellArray(props.cols)[number]}>
                        {Object.values(tr)[number] as JSX.Element}
                      </TableCell>
                    );
                  })}
                {Object.keys(props.rows[0].userList[0]).map((item: any, index) => {
                  return <TableBattleResultInfoUserListCellView key={"item" + index} no={index} itemList={props.itemList} />;
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
export default TableBattleResultInfoBodyView;

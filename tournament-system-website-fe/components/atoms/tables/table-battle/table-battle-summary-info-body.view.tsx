import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import React, { Dispatch } from "react";
import { TableLayoutProps } from "../tableLayout.view";
import FormCaptionView from "../../forms/form-caption.view";
import { TableCell } from "@mui/material";
import { tableAddCellArray } from "../../../../utils/public/tableAddCellArray";
import TableBattleSummaryInfoCell from "./table-battle-summary-info-cell";
import TableBattleSummaryInfoParticipantsCellView from "./table-battle-summary-info-participants-cell.view";

export type tableBodyProps = {
  rows: TableLayoutProps["rows"];
  onChecked?: TableLayoutProps["onChecked"];
  checkItems?: TableLayoutProps["checkItems"];
  cols: TableLayoutProps["cols"];
  setOpen?: Dispatch<any>;
  onClick?: () => void;
};

export type modalSetProps = {
  open: {
    [key: string]: boolean;
  };
  setModalContent: Dispatch<React.ReactNode>;
  setModalTitle: Dispatch<React.ReactNode>;
  setModalButtonItem: Dispatch<any[]>;
  handleClose: Dispatch<any>;
  setModalChange: Dispatch<string>;
};

type TableBattleSummaryInfoBodyViewProps = {
  tableLayoutProps: tableBodyProps;
  modalProps: modalSetProps;
};
const TableBattleSummaryInfoBodyView = ({ tableLayoutProps, modalProps }: TableBattleSummaryInfoBodyViewProps) => {
  return (
    <>
      {tableLayoutProps.rows.length !== 0 ? (
        <TableBody component={"tbody"}>
          {[...tableLayoutProps.rows].map((tr, num) => {
            // 회차 , 토너먼트, 대전시작일시
            return (
              <TableRow hover selected={tableLayoutProps.checkItems?.includes(String(Object.keys(tr)[0]))} key={"th" + num} style={{ width: "100%" }}>
                {tableAddCellArray(tableLayoutProps.cols)
                  .filter((item, number) => typeof Object.values(tr)[number] === "number" || typeof Object.values(tr)[number] === "string")
                  .map((td, number) => {
                    return (
                      <TableCell key={"td" + number} {...td}>
                        {Object.values(tr)[number] as JSX.Element}
                      </TableCell>
                    );
                  })}
                {
                  // 참가인원 정보
                  Object.keys(tr)
                    .filter((item, number) => "info" === item)
                    .map((key, index) => {
                      return <TableBattleSummaryInfoParticipantsCellView key={index} tr={tr[key]} />;
                    })
                }

                {
                  // 정보, 단계...
                  Object.keys(tr)
                    .filter((item, number) => "phases" === item)
                    .map((key, index) => {
                      return <TableBattleSummaryInfoCell key={index} tr={tr[key]} modalProps={modalProps} />;
                    })
                }
                {
                  // 상세정보, 중지...
                  Object.keys(tr)
                    .filter((filter) => filter.indexOf("Button") !== -1)
                    .map((td, index) => {
                      const length = Object.keys(tr).length - 4;

                      return (
                        <TableCell key={"td" + index + length} {...tableAddCellArray(tableLayoutProps.cols)[index + length + 1]} colSpan={1}>
                          {Object.values(tr)[index + length] as JSX.Element}
                        </TableCell>
                      );
                    })
                }
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
export default TableBattleSummaryInfoBodyView;

import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { tableAddCellArray } from "../../../../utils/public/tableAddCellArray";
import { TableCell } from "@mui/material";
import FormCaptionView from "../../forms/form-caption.view";
import React from "react";
import { tableBodyProps } from "./table-battle-summary-info-body.view";

export type bodyCellProps = {
  bodyCell: (number: number, tr: JSX.Element) => React.ReactNode;
};

const TableBattleDetailsRoomInfoBodyView = ({ ...props }: tableBodyProps & bodyCellProps) => {
  return (
    <>
      {props.rows.length !== 0 ? (
        <TableBody component={"tbody"}>
          {[...props.rows].map((tr, num) => {
            return (
              <TableRow hover selected={props.checkItems?.includes(String(Object.keys(tr)[0]))} key={"th" + num} style={{ width: "100%" }}>
                {Object.keys(tr)
                  .filter((filter) => filter.indexOf("Button") === -1)
                  .map((td, index) => {
                    return (
                      <TableCell key={"td" + index + length} {...tableAddCellArray(props.cols)[index + length]}>
                        {Object.values(tr)[index + length] as JSX.Element}
                      </TableCell>
                    );
                  })}

                {
                  // 상세정보, 중지...
                  Object.keys(tr)
                    .filter((filter) => filter.indexOf("Button") !== -1)
                    .map((td, index) => {
                      const length = Object.keys(tr).length - 4;
                      return (
                        <TableCell key={"td" + index + length} {...tableAddCellArray(props.cols)[index + length]}>
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

export default TableBattleDetailsRoomInfoBodyView;

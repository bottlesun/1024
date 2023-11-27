import React from "react";
import { Table, TableCell } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableBattleSummaryRowCellView from "./table-battle-summary-row-cell.view";
import { modalSetProps } from "./table-battle-summary-info-body.view";

export type tournamentBreakInPropsType = {
  round: number;
  user: { id: string; tournament: string; step: string; room: number }[];
};

export type ableBattleSummaryInfoCellProps = {
  tr: {
    set: string;
    done: string | number;
    wait: number;
    gap: "";
    jumped_in_count: string | number;
    jumped_in_info_count: string | number;
  }[];
  modalProps: modalSetProps;
};
const TableBattleSummaryInfoCell = ({ tr, modalProps }: ableBattleSummaryInfoCellProps) => {
  // const router = useRouter();
  // const [rowBreakInList, setRowBreakInList] = useState<tournamentBreakInPropsType["user"]>([]);
  // const tableProps: TableLayoutProps = {
  //   cols: [
  //     // 테이블 헤더 1행
  //     { name: "아이디", colSpan: 1, rowSpan: 1, align: "center" },
  //     { name: "토너먼트", colSpan: 1, rowSpan: 1, align: "center" },
  //     { name: "난입 단계", colSpan: 1, rowSpan: 1, align: "center" },
  //     { name: "난입 방", colSpan: 1, rowSpan: 1, align: "center" }
  //   ],
  //   rows: rowBreakInList,
  //   autoHeightMax: 400,
  //   tableWidth: "500px",
  //   tableMinWidth: "100%"
  // };

  // useEffect(() => {
  //   //console.log(tournamentBreakIn);
  //   let breakInArray = tournamentBreakIn.filter((item) => {
  //     return item.round === props.no;
  //   });
  //   let breakInList = [...breakInArray[0].user].filter((item) => {
  //     return item.step === props.keyProps;
  //   });
  //
  //   setRowBreakInList([...breakInList]);
  // }, [props.no]);

  // const handleBreakInUserModal = () => {
  //   modalProps.setModalChange("breakInUser");
  //   modalProps.open.breakInUser = true;
  //   modalProps.setModalContent(
  //     <>
  //       <TableLayoutView {...tableProps}>
  //         <TableHeadView {...tableProps} />
  //         <TableBodyNotNumberView {...tableProps} />
  //       </TableLayoutView>
  //     </>
  //   );
  //   modalProps.setModalTitle("난입유저");
  //   modalProps.setModalButtonItem([{ id: "buttons", text: "확인", onClick: () => modalProps.handleClose("breakInUser") }]);
  //   return router.push(
  //     {
  //       pathname: router.pathname,
  //       query: { ...router.query }
  //     },
  //     "/instances/battle"
  //   );
  // };

  return (
    <>
      {Object.values(tr).map((item, num) => {
        return (
          <TableCell key={num} sx={{ padding: "0!important" }}>
            <Table sx={{ minWidth: "100%!important" }}>
              <TableBody component={"tbody"}>
                <TableBattleSummaryRowCellView bg value={item.set} />
                <TableBattleSummaryRowCellView value={item.done} />
                <TableBattleSummaryRowCellView bg value={item.wait === 0 ? "-" : item.wait} />
                <TableBattleSummaryRowCellView value={item.gap} />
                <TableBattleSummaryRowCellView bg value={item.jumped_in_count} />
                <TableBattleSummaryRowCellView value={item.jumped_in_info_count} />

                {/*<TableBattleSummaryRowCellLinkView value={item.jumped_in_count === 0 ? "-" : item.jumped_in_count} onClick={() => handleBreakInUserModal()} />*/}
              </TableBody>
            </Table>
          </TableCell>
        );
      })}
    </>
  );
};

export default TableBattleSummaryInfoCell;

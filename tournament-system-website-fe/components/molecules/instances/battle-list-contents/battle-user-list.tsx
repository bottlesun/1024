import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TopBoxStyle } from "../../../../styles/layout";
import BoxTableTitleView from "../../../atoms/box/box-table-title.view";
import TableLayoutView from "../../../atoms/tables/tableLayout.view";
import TableBodyView from "../../../atoms/tables/table-body.view";
import TableHeadView from "../../../atoms/tables/table-head.view";

const colsData = [
  // 테이블 헤더 1행

  { name: "NO", colSpan: 1, rowSpan: 1, align: "center", width: "50px" }, // index
  { name: "User ID", colSpan: 1, rowSpan: 1, align: "center" }, // user_id
  { name: "Partner ID", colSpan: 1, rowSpan: 1, align: "center" }, // partner_id
  { name: "신청 토너먼트", colSpan: 1, rowSpan: 1, align: "center" }, // schedule_name
  { name: "참가 방", colSpan: 1, rowSpan: 1, align: "center" }, // sequence
  { name: "완료여부", colSpan: 1, rowSpan: 1, align: "center" }, // is_done
  { name: "참가종류", colSpan: 1, rowSpan: 1, align: "center" } // is_jumped_in
];

const BattleUserList = ({ ...props }) => {
  const { userListData, open, forms, clickTableState } = props;
  const router = useRouter();
  const [rowData, setRowData] = useState<any[]>([]);
  const [cols, setCols] = useState<any>([...colsData]);
  // console.log(userListData, "userListData");
  useEffect(() => {
    if (userListData.length === 0) return setRowData([]);
    const updatedTournamentRoomListData = [...userListData].map((user, index) => {
      return {
        no: index + 1,
        user_id: user.user_id ? user.user_id : "-",
        partner_id: user.partner_id ? user.partner_id : "-",
        schedule_name: user.schedule_name + (" (" + user.id + ")"),
        sequence: user.sequence,
        is_done: user.is_done ? "완료" : "미완료",
        is_jumped_in: user.is_jumped_in ? "난입" : "일반 참가"
      };
    });
    setRowData([...updatedTournamentRoomListData]);
  }, [clickTableState, open, forms, router.query, userListData]);

  const BattleUserListProps = {
    tableLayoutTopProps: {
      text: "유저 리스트"
    },
    tableLayoutProps: {
      cols: cols,
      rows: rowData,
      autoHeightMax: 550
    }
  };

  return (
    <>
      <Box css={TopBoxStyle}>
        <BoxTableTitleView {...BattleUserListProps.tableLayoutTopProps} />
      </Box>
      <TableLayoutView {...BattleUserListProps.tableLayoutProps}>
        <TableHeadView {...BattleUserListProps.tableLayoutProps} />
        <TableBodyView {...BattleUserListProps.tableLayoutProps} />
      </TableLayoutView>
    </>
  );
};

export default BattleUserList;

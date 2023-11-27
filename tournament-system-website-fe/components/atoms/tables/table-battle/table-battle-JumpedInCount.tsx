import TableLayoutView, { TableLayoutProps } from "../tableLayout.view";
import TableHeadView from "../table-head.view";
import TableBodyNotNumberView from "../table-body-not-number.view";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MatchV1PhaseRoomFindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.res.dto";

const TableBattleJumpedInCount = ({ data }: { data: MatchV1PhaseRoomFindDataRes[] }) => {
  const router = useRouter();
  const [rowJumpedInList, setRowJumpedInList] = useState<any[]>([]);

  useEffect(() => {
    const rowJumpedIn = [...data].map((item, index) => {
      return {
        user_id: item.user_id,
        schedule_name: item.schedule_name,
        phase: item.phase, // 단계
        sequence: item.sequence // 회차
      };
    });
    setRowJumpedInList([...rowJumpedIn]);
  }, [data]);

  const tableProps: TableLayoutProps = {
    cols: [
      // 테이블 헤더 1행
      { name: "아이디", colSpan: 1, rowSpan: 1, align: "center" },
      { name: "토너먼트", colSpan: 1, rowSpan: 1, align: "center" },
      { name: "난입 단계", colSpan: 1, rowSpan: 1, align: "center" },
      { name: "난입 방", colSpan: 1, rowSpan: 1, align: "center" }
    ],
    rows: rowJumpedInList,
    autoHeightMax: 400,
    tableWidth: "500px",
    tableMinWidth: "100%"
  };

  return (
    <TableLayoutView {...tableProps}>
      <TableHeadView {...tableProps} />
      <TableBodyNotNumberView {...tableProps} />
    </TableLayoutView>
  );
};

export default TableBattleJumpedInCount;

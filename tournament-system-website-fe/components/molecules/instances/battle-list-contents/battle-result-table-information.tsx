import React, { useEffect, useState } from "react";
import TableLayoutView, { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import TableHeadView from "../../../atoms/tables/table-head.view";
import TableBattleResultInfoBodyView from "../../../atoms/tables/table-battle/table-battle-result-info.body.view";
import { TemplateTableHeadTypes } from "../../template/list/template-table-list";
import dayjs from "dayjs";
import { MatchV1PhaseRoomFindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.res.dto";

type BattleResultTableInformationProps = {
  data: MatchV1PhaseRoomFindDataRes[];
  roomListInfo: {
    win_amount: number;
    room_started_at: string;
    winner_user_id: string;
  };
};
const BattleResultTableInformation = ({ data, roomListInfo }: BattleResultTableInformationProps) => {
  const [tournamentList, setTournamentList] = useState<any[]>([]);
  const [userListData, setUserListData] = useState<any[]>([]);
  // [...tournamentUserInfo[0].data] 더미 데이터
  useEffect(() => {
    console.log(roomListInfo);
    const userList = data.map((item, index) => {
      return {
        user_id: item.user_id,
        win_amount: item.user_id === roomListInfo.winner_user_id ? roomListInfo.win_amount.toLocaleString() : "-"
      };
    });
    setUserListData([...userList]);
    const tournamentListData = {
      phase: data[0].phase, // 단계
      sequence: data[0].sequence, // 회차
      room_started_at: roomListInfo.room_started_at !== null ? dayjs(roomListInfo.room_started_at).format("YYYY.MM.DD") : "-", // 날짜
      time: roomListInfo.room_started_at !== null ? dayjs(roomListInfo.room_started_at).format("HH:mm:ss") : "-", // 시간
      userList: userList
    };
    setTournamentList([tournamentListData]);
  }, [data, roomListInfo]);
  const tableCols = [
    { name: "단계", colSpan: 1, rowSpan: 1, align: "center", width: 50, height: "40px" },
    { name: "방번호", colSpan: 1, rowSpan: 1, align: "center", width: 50 },
    { name: "날짜", colSpan: 1, rowSpan: 1, align: "center", width: 150 },
    { name: "시간", colSpan: 1, rowSpan: 1, align: "center", width: 100 },
    { name: "유저", colSpan: 1, rowSpan: 1, align: "center", width: 100 },
    { name: "승리금액", colSpan: 1, rowSpan: 1, align: "center", width: 100 }
  ];

  const props: TableLayoutProps = {
    cols: tableCols as TemplateTableHeadTypes[],
    rows: tournamentList,
    autoHeightMax: 500,
    tableMaxWidth: "1000px",
    tableMinWidth: "700px",
    itemList: userListData.map((obj) => Object.values(obj))
  };
  return (
    <>
      <TableLayoutView {...props}>
        <TableHeadView {...props} />
        <TableBattleResultInfoBodyView {...props} />
      </TableLayoutView>
    </>
  );
};
export default BattleResultTableInformation;

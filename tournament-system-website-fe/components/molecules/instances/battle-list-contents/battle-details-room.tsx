import React, { useEffect, useState } from "react";
import { onKoreanTimeChange } from "../../../../utils/public/timeChange";
import ButtonTableLinkView from "../../../atoms/button/button-table-link.view";
import BattleDetailsRoomView from "./battle-details-room.view";
import { statusStringChange } from "../../../../utils/public/selectMap";
import { useRouter } from "next/router";
import PaginationView from "../../../atoms/pagination/pagination.view";
import { MatchV1PhaseFindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.res.dto";

const BattleDetailsRoom = ({ ...props }) => {
  const router = useRouter();
  const { open, clickTableState, page, forms, roomTotal, max_phase, roomListData } = props;
  const { readRoomButton, cancelButton, gameResultButton, roomReplayButton, jumpedInCountButton } = props.button;
  const [rowData, setRowData] = useState<any[]>([]);
  const roomPage = router.query.roomPage !== undefined ? Number(router.query.roomPage) : 1;

  useEffect(() => {
    /*방 상세정보 table 데이터*/
    if (props.roomListData === undefined) return setRowData([]);
    const TournamentRoomListData = props.roomListData
      .filter((item: MatchV1PhaseFindDataRes) => {
        if (forms.room !== undefined && forms.room !== "all") return item.sequence === Number(forms.room);
        return item;
      })
      .map((roomList: MatchV1PhaseFindDataRes, index: number) => {
        return {
          id: roomList.id,
          no: roomList.sequence, // 방 번호
          room_started_at: roomList.room_started_at !== null ? onKoreanTimeChange(roomList.room_started_at) : "-",
          status: statusStringChange(roomList.status) + " - " + roomList.phase + "단계", // 방 상태
          phase: max_phase, // 총 단계
          //phase: 1,
          jumped_in_count: roomList.jumped_in_count === 0 ? 0 : <ButtonTableLinkView data-id={roomList.id} data-no={index + 1} {...jumpedInCountButton} name={`${roomList.jumped_in_count}명`} />, // 난입자 수
          winner_user_id: roomList.winner_user_id !== null ? roomList.winner_user_id : "-",
          win_amount: roomList.win_amount !== null ? roomList.win_amount.toLocaleString() : "-",
          gameResultButton: <ButtonTableLinkView data-no={roomList.sequence} data-id={roomList.id} disabled={roomList.status !== "done"} {...gameResultButton} />,
          readButton: <ButtonTableLinkView data-no={roomList.sequence} data-id={roomList.id} {...readRoomButton} />,
          cancelButton: <ButtonTableLinkView data-no={roomList.sequence} data-id={roomList.id} {...cancelButton} />,
          roomReplayButton: <ButtonTableLinkView data-no={roomList.sequence} data-id={roomList.id} {...roomReplayButton} />
        };
      });
    setRowData(TournamentRoomListData);
  }, [clickTableState, open, props.roomListData, router.query, forms]);

  const BattleDetailsRoomProps = {
    tableProps: {
      tableLayoutTopProps: {
        text: "방 상세정보"
      },
      tableLayoutProps: {
        cols: [
          // 테이블 헤더 1행
          { name: "ID", colSpan: 1, rowSpan: 1, align: "center", width: "100px" },
          { name: "방", colSpan: 1, rowSpan: 1, align: "center", width: "50px" },
          { name: "시작일시", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "방 상태", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "최종단계", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "난입유저", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "승리유저", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "승리금액", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "게임결과", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "상세정보", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "취소", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "재경기", colSpan: 1, rowSpan: 1, align: "center" }
        ],
        rows: rowData,
        autoHeightMax: 800
      }
    },
    paginationProps: {
      count: Math.ceil(roomTotal / 20) <= 1 ? 1 : Math.ceil(roomTotal / 20),
      page: roomPage,
      onChange: (e: MouseEvent, roomPage: number) => {
        return router.push(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              roomPage: roomPage
            }
          },
          "/instances/battle"
        );
      }
    }
  };
  return (
    <>
      <BattleDetailsRoomView {...BattleDetailsRoomProps.tableProps} />
      {forms.phase === undefined || (forms.phase === "all" && <PaginationView {...BattleDetailsRoomProps.paginationProps} />)}
    </>
  );
};

export default BattleDetailsRoom;

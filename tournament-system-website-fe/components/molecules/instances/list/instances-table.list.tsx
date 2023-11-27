import { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import TemplateTableListView from "../../template/list/template-table.list.view";
import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import ButtonTableLinkView from "../../../atoms/button/button-table-link.view";
import { onKoreanTimeChange } from "../../../../utils/public/timeChange";
import { buttonPropsType } from "../../../atoms/button/button.view";
import { PowNumber, secondToMinute } from "../../../../utils/public/formatNumber";
import { PostDataTypes } from "../../../../apis/types/instance.api.type";
import dayjs from "dayjs";
import { Box } from "@mui/material";

export type buttonListProps<T> = {
  readButton?: T;
  patchButton?: T;
  deleteButton?: T;
  stopButton?: T;
  playButton?: T;
  invalidityButton?: T;
  createButton?: T;
};

export type instancesListPropsType = {
  button: buttonListProps<buttonPropsType>;
  instancesListData: PostDataTypes[];
  open: {
    [key: string]: boolean;
  };
};

function InstancesTableList({ button, instancesListData, open }: instancesListPropsType) {
  const { readButton, stopButton, playButton, deleteButton } = button;
  const [tournamentList, setTournamentList] = useState<any[]>([]);
  const stateMap = (value: string | null) => {
    switch (value) {
      case "stop":
        return "중지";
      case "stop_request":
        return "중지 처리중";
      case "done":
        return "완료";
      case "progress":
        return "진행중";
      default:
        return "대기";
    }
  };

  useEffect(() => {
    let instancesTableList = instancesListData.map((item, index) => {
      // console.log("item.is_suspended", item.is_suspended);
      // console.log(item.is_suspended); //is_suspended 는 null, true, false
      return {
        no: index + 1,
        id: item.id,
        tournament_type: item.tournament_type !== "CommonTournament" ? "이벤트" : "공통",
        schedule_name: item.schedule_name,
        open_date_time: onKoreanTimeChange(item.open_date_time),
        participating_time: secondToMinute(item.participating_time), // 참여시간
        total_participant_count: PowNumber(item.room_headcount, item.total_phase),
        readButton: <ButtonTableLinkView data-no={index + 1} data-id={item.id} {...readButton} />,
        battle: (
          <>
            {item.status === "progress" ? (
              <Link href={`/instances/battle?id=${item.id}&ended_at=${dayjs(item.open_date_time).format("YYYY-MM-DD")}`} style={{ textDecoration: "underline" }}>
                바로가기
              </Link>
            ) : (
              <Box style={{ cursor: "default", color: "var(--disabled-color)" }}>바로가기</Box>
            )}
          </>
        ),
        state: item.is_deleted === false ? stateMap(item.status) : "삭제 처리중",
        stopButton: <ButtonTableLinkView data-no={index + 1} data-id={item.id} disabled={item.is_suspended} {...stopButton} />, // 중지
        playButton: <ButtonTableLinkView data-no={index + 1} data-id={item.id} disabled={!item.is_suspended} {...playButton} />, // 재시작
        deleteButton: <ButtonTableLinkView data-no={index + 1} data-id={item.id} data-suspended={item.is_suspended} {...deleteButton} /> // 삭제
      };
    });
    // let instancesTableList2 = [...instancesTableList.filter((item, index) => item.state !== "완료"), ...instancesTableList.filter((item, index) => item.state === "완료")];
    setTournamentList([...instancesTableList]);
  }, [instancesListData, open]);

  const tableProps: TableLayoutProps = {
    cols: [
      { name: "NO.", colSpan: 1, rowSpan: 2, align: "center", width: 50, height: 50 },
      { name: "ID", colSpan: 1, rowSpan: 2, align: "center", width: 50, height: 50 },
      { name: "이벤트 여부", colSpan: 1, rowSpan: 2, align: "center", width: 50, height: 50 },
      { name: "토너먼트", colSpan: 1, rowSpan: 2, align: "center", width: 150 },
      { name: "시작 일시", colSpan: 1, rowSpan: 2, align: "center", width: 250 },
      {
        name: "참여시간(분)",
        colSpan: 1,
        rowSpan: 2,
        align: "center",
        width: 80
      },
      {
        name: "참여인원(명)",
        colSpan: 1,
        rowSpan: 2,
        align: "center",
        width: 80
      },
      { name: "상세정보", colSpan: 1, rowSpan: 2, align: "center", width: 100 },
      { name: "대전리스트", colSpan: 1, rowSpan: 2, align: "center", width: 90 },
      { name: "상태", colSpan: 1, rowSpan: 2, align: "center", width: 100 },
      { name: "중지", colSpan: 2, rowSpan: 2, align: "center", width: 75 },
      { name: "삭제", colSpan: 1, rowSpan: 2, align: "center", width: 75 }
    ],

    rows: tournamentList, // 테이블 바디

    autoHeightMax: 550
  };
  const Props = {
    footerBody: {
      length: tournamentList.length,
      footerText: "클릭하여 스케줄 생성",
      footerHref: "/instances/create"
    },
    table: {
      tableProps
    }
  };
  return <TemplateTableListView {...Props} />;
}
export default InstancesTableList;

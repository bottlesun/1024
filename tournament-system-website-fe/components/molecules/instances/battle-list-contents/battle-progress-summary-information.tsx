import { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import React, { useEffect, useState } from "react";
import BattleSummaryInformationView from "./battle-summary-information.view";
import { useRouter } from "next/router";
import { onKoreanTimeChange } from "../../../../utils/public/timeChange";
import ButtonTableLinkView from "../../../atoms/button/button-table-link.view";
import { statusStringChange } from "../../../../utils/public/selectMap";
import { MatchV1FindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.res.dto";
import { commonCols } from "./battle-summary-information";

const BattleProgressSummaryInformation = ({ ...props }) => {
  const { open, handleClose, setModalContent, setModalTitle, setModalButtonItem, forms, clickTableState, setModalChange, matchListData, matchListMeta } = props;
  const { readButton, stopButton, playButton, deleteButton } = props.button;

  const router = useRouter();
  const [rowData, setRowData] = useState<any[]>([]);
  const [autoPhases, setAutoPhasesCols] = useState<any[]>([]);
  useEffect(() => {
    // auto Phases cols
    if (matchListData !== undefined) {
      const autoPhasesCols = [...new Array(matchListMeta.max_phase)].map((item, index) => {
        return {
          name: index + 1 + "단계",
          colSpan: 1,
          rowSpan: 1,
          align: "center"
        };
      });
      let maxLength = matchListMeta.max_phase;
      const resultArrays = [...matchListData].map((item: MatchV1FindDataRes) => {
        const phases = item.phases.map((phase) => ({
          set: statusStringChange(phase.status) ? statusStringChange(phase.status) : "-",
          done: phase.phase_room_count ? phase.done_room_count + "/" + phase.phase_room_count : "-",
          wait: phase.phase_room_count ? phase.phase_room_count - phase.done_room_count : "-",
          gap: "",
          jumped_in_count: phase.jumped_in_count,
          jumped_in_info_count: phase.jumped_in_info_count
        }));

        const diff = maxLength - item.phases.length;
        const filledArray = new Array(diff).fill({}).map(() => ({
          set: "-",
          done: "-",
          wait: "-",
          jumped_in_count: "-",
          jumped_in_info_count: "-"
        }));

        return phases.concat(filledArray as any);
      });

      const updatedListData = [...matchListData].map((item, index) => {
        return {
          id: item.id, // 토너먼트 ID
          schedule_name: item.schedule_name,
          instance_started_at: onKoreanTimeChange(item.instance_started_at),
          info: [
            {
              total_participant_count: "총 참가인원",
              join_count: "들어온 인원",
              progress_count: "게임중인 인원",
              jumped_in_count: "난입 인원",
              done_count: "종료 인원",
              need_count: "필요한 인원"
            },
            {
              total_participant_count: item.total_participant_count,
              join_count: item.join_count,
              progress_count: item.progress_count,
              jumped_in_count: item.jumped_in_count,
              done_count: item.done_count,
              need_count: item.need_count
            }
          ], // 참가인원 정보
          phases: [
            {
              set: "상태",
              done: "완료 방",
              wait: "대기 방",
              gap: "",
              jumped_in_count: "난입 유저",
              jumped_in_info_count: "난입에 대한 인원 정보"
            },
            ...resultArrays[index]
          ], //
          readButton: <ButtonTableLinkView data-no={index + 1} data-id={item.id} {...readButton} />,
          stopButton: <ButtonTableLinkView data-no={index + 1} data-id={item.id} disabled={item.is_suspended} {...stopButton} />, // 중지버튼
          playButton: <ButtonTableLinkView data-no={index + 1} data-id={item.id} disabled={!item.is_suspended} {...playButton} />, // 재시작버튼
          deleteButton: <ButtonTableLinkView data-is-suspended={item.is_suspended ? "true" : "false"} data-id={item.id} {...deleteButton} /> // 삭제버튼
        };
      });
      setRowData([...updatedListData]);
      setAutoPhasesCols([...autoPhasesCols]);
    }
  }, [matchListData, open, forms, clickTableState, router.query]);
  const BattleSummaryProps = {
    summaryProps2: {
      tableLayoutProps: {
        cols: [
          // 테이블 헤더 1행
          ...commonCols(autoPhases)
        ],
        rows: rowData,
        autoHeightMax: 402
      } as TableLayoutProps,
      modalProps: {
        open,
        handleClose,
        setModalContent,
        setModalTitle,
        setModalButtonItem,
        setModalChange
      },
      topTitle: {
        title: "운영중인 토너먼트 요약정보"
      }
    }
  };
  return (
    <>
      <BattleSummaryInformationView {...BattleSummaryProps.summaryProps2} />
    </>
  );
};
export default BattleProgressSummaryInformation;

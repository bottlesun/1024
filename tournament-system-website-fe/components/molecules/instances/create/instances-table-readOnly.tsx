import React, { useEffect, useState } from "react";
import TableLayoutView, { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import { Box, Typography } from "@mui/material";
import { TopBoxStyle } from "../../../../styles/layout";
import BoxTableTitleView from "../../../atoms/box/box-table-title.view";
import TableHeadView from "../../../atoms/tables/table-head.view";
import TableBodyNotNumberView from "../../../atoms/tables/table-body-not-number.view";
import { TemplateTableHeadTypes } from "../../template/list/template-table-list";
import { onKoreanTimeChange } from "../../../../utils/public/timeChange";
import { formatNumber, PowNumber, secondToMinute } from "../../../../utils/public/formatNumber";
import dayjs from "dayjs";

const InstancesTableReadOnly = ({ ...props }) => {
  const { data } = props;
  const [tournamentList, setTournamentList] = useState<any[]>([]);

  const is_suspendStatus = (data: boolean | null) => {
    switch (data) {
      case true:
        return "중지";
      case false:
        return "진행";
      case null:
        return "처리중";
    }
  };

  const InstanceDeleted = (data: boolean | null) => {
    switch (data) {
      case true:
        return "삭제";
      case false:
        return "정상";
      case null:
        return "처리중";
    }
  };

  useEffect(() => {
    console.log(data.image_by_phase);
    const dataProps = {
      open_date_time: onKoreanTimeChange(data.open_date_time), // 시작시간
      instance_started_at: data.instance_started_at ? onKoreanTimeChange(data.instance_started_at) : onKoreanTimeChange(data.open_date_time),
      instance_ended_at: data.instance_ended_at ? onKoreanTimeChange(data.instance_ended_at) : dayjs(data.open_date_time).add(data.participating_time, "second").format("YYYY.MM.DD HH:mm"),
      participating_time: secondToMinute(data.participating_time), // 참여시간
      room_headcount: data.room_headcount, // 방 인원수,
      total_phase: data.total_phase, // 단계
      image_by_phase: data.image_by_phase === null || data.image_by_phase.length === 0 ? "" : data.image_by_phase[0], // 단계
      participation_fee_currency_code: data.participation_fee_currency_code ? data.participation_fee_currency_code.toUpperCase() : null, // 참여비 통화코드
      participation_fee_amount: formatNumber(data.participation_fee_amount), // 참여비 금액
      participation_commission: data?.participation_commission + "%",
      total_participant_count: PowNumber(data.room_headcount, data.total_phase),
      player_game_money: formatNumber(data.player_game_money), // 플레이어 게임머니,
      tournament_type: data.tournament_type !== "CommonTournament" ? "이벤트" : "공통",
      event_prize_money: formatNumber(data.event_prize_money), // 이벤트 상금,
      is_allowed_free_coupon: data.is_allowed_free_coupon ? "사용" : "미사용",
      is_first_phase_created: data.is_first_phase_created ? "생성" : "미생성",
      is_soldout: data.is_soldout ? "마감" : "판매중", // 티켓판매
      is_suspended: is_suspendStatus(data.is_suspended), // 대회진행
      is_deleted: InstanceDeleted(data.is_deleted) // 삭제여부

      // betting_amount_minimum: formatNumber(data.betting_amount_minimum), // 배팅 최소 금액
      // betting_amount_maximum: formatNumber(data.betting_amount_maximum), // 배팅 최대 금액
      // betting_time_gold: onTimeSecondsUnit(data.betting_time_gold), // 배팅시간 골드
      // betting_time_none: onTimeSecondsUnit(data.betting_time_none), // 배팅시간 ,
    };

    setTournamentList([dataProps]);
  }, [data]);

  const tableCols = [
    {
      name: (
        <>
          대회
          <br />
          시작일시
        </>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    {
      name: (
        <Typography sx={{ fontSize: 14 }}>
          인스턴스
          <br />
          시작일시
        </Typography>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    {
      name: (
        <Typography sx={{ fontSize: 14 }}>
          인스턴스
          <br />
          종료일시
        </Typography>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    {
      name: (
        <Typography sx={{ fontSize: 14 }}>
          참여시간
          <br /> (분)
        </Typography>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    { name: "방 인원", colSpan: 1, rowSpan: 2, align: "center" },
    { name: "단계", colSpan: 1, rowSpan: 2, align: "center" },
    {
      name: (
        <Typography sx={{ fontSize: 14 }}>
          이미지
          <br /> 설정
        </Typography>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    { name: "참가금액", colSpan: 2, rowSpan: 2, align: "center" },
    {
      name: (
        <Typography sx={{ fontSize: 14 }}>
          수수료율
          <br /> (%)
        </Typography>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    {
      name: (
        <Typography sx={{ fontSize: 14 }}>
          전체
          <br /> 참여인원(명)
        </Typography>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    { name: "인당 할당금액", colSpan: 1, rowSpan: 2, align: "center" },
    {
      name: (
        <>
          이벤트
          <br />
          여부
        </>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    {
      name: (
        <>
          이벤트 대회
          <br />
          상금
        </>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    {
      name: (
        <Typography sx={{ fontSize: 14 }}>
          프리 쿠폰 <br /> 사용여부
        </Typography>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    {
      name: (
        <Typography sx={{ fontSize: 14 }}>
          처음 방<br />
          여부
        </Typography>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center"
    },
    { name: "티켓 판매", colSpan: 1, rowSpan: 2, align: "center" },
    {
      name: (
        <>
          토너먼트
          <br />
          상태
        </>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center",
      height: 50,
      max: 250
    },
    {
      name: (
        <>
          인스턴스
          <br />
          삭제여부
        </>
      ),
      colSpan: 1,
      rowSpan: 2,
      align: "center",
      height: 50,
      max: 250
    }
    // {
    //   name: "배팅 시간",
    //   colSpan: 2,
    //   rowSpan: 1,
    //   align: "center",
    //   subcols: [
    //     { name: "시간1", colSpan: 1, rowSpan: 1, align: "center" },
    //     { name: "시간2", colSpan: 1, rowSpan: 1, align: "center" }
    //   ]
    // }
  ];

  const InstancesTableReadOnlyProps: TableLayoutProps = {
    cols: tableCols as TemplateTableHeadTypes[],
    rows: tournamentList,
    autoHeightMax: 500
  };

  return (
    <>
      <Box css={TopBoxStyle} sx={{ marginTop: "-15px!important" }}>
        <BoxTableTitleView text={`${data.schedule_name + "(" + data.id + ")"} 상세정보`} />
      </Box>
      <TableLayoutView {...InstancesTableReadOnlyProps}>
        <TableHeadView {...InstancesTableReadOnlyProps} />
        <TableBodyNotNumberView {...InstancesTableReadOnlyProps} />
      </TableLayoutView>
    </>
  );
};
export default InstancesTableReadOnly;

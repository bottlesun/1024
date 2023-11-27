import React, { useEffect, useState } from "react";
import { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import { Typography } from "@mui/material";
import TemplateTableListView from "../../template/list/template-table.list.view";
import ButtonTableLinkView from "../../../atoms/button/button-table-link.view";
import { buttonPropsType } from "../../../atoms/button/button.view";
import { buttonListProps } from "../../instances/list/instances-table.list";
import { ButtonProps } from "@mui/material/Button/Button";
import { onKoreanTimeChange } from "../../../../utils/public/timeChange";
import { formatNumber, PowNumber, secondToMinute } from "../../../../utils/public/formatNumber";
import { useRouter } from "next/router";
import { ScheduleV1FindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/schedule-v1/schedule-v1.res.dto";
import BoxFilePickerView from "../../../atoms/box/box-filePicker.view";

export type scheduleListPropsDataType = {
  button: buttonListProps<buttonPropsType>;
  scheduleListData: ScheduleV1FindDataRes[];
  open: {
    [key: string]: boolean;
  };
  forms: any;
};

type ScheduleRowDataType<T> = {
  patchButton: T;
  createButton: T;
  deleteButton: T;
  readButton: T;
  allPeople: number;
};

const ScheduleTableList = ({ forms, scheduleListData, button, open }: scheduleListPropsDataType) => {
  const { patchButton, deleteButton, createButton, readButton } = button;
  const router = useRouter();
  const [scheduleList, setScheduleList] = useState<Partial<ScheduleV1FindDataRes[] & ScheduleRowDataType<ButtonProps>>[]>([]);
  useEffect(() => {
    // console.log(scheduleListData);
    let ScheduleRowList = scheduleListData.map((item, index) => {
      return {
        no: index + 1,
        schedule_name: item.schedule_name,
        tournament_type: item.tournament_type === "CommonTournament" ? "공통 토너먼트" : "이벤트 토너먼트",
        open_date_time: onKoreanTimeChange(item.open_date_time),
        participating_time: secondToMinute(item.participating_time),
        room_headcount: item.room_headcount, // 방 인원
        total_phase: item.total_phase, // 총 단계,
        image_by_phase: <BoxFilePickerView img={item.image_by_phase} />, // 이미지
        participation_fee_currency_code: item.participation_fee_currency_code.toUpperCase(), // 참가비 통화
        participation_fee_amount: formatNumber(item.participation_fee_amount), // 참가비
        is_allowed_free_coupon: item.is_allowed_free_coupon ? "사용" : "미사용",
        total_participant_count: PowNumber(item.room_headcount, item.total_phase),
        state: item.is_instance_created ? "인스턴스 등록 완료" : "인스턴스 등록 대기",
        // readButton: <ButtonTableLinkView data-no={index + 1} {...readButton} />,
        patchButton: <ButtonTableLinkView data-no={index + 1} disabled={item.is_instance_created} {...patchButton} />,
        deleteButton: <ButtonTableLinkView data-no={index + 1} disabled={item.is_instance_created} {...deleteButton} />,
        createButton: <ButtonTableLinkView data-no={index + 1} disabled={item.is_instance_created} {...createButton} />
      };
    });
    setScheduleList([...ScheduleRowList]);
  }, [scheduleListData, open, forms, router]);

  const tableProps: TableLayoutProps = {
    cols: [
      { name: "NO.", colSpan: 1, rowSpan: 2, align: "center", width: "50px" },
      { name: "토너먼트", colSpan: 1, rowSpan: 2, align: "center", height: "50px" },
      {
        name: "이벤트 여부",
        colSpan: 1,
        rowSpan: 2,
        align: "center",
        width: "120px"
      },
      { name: "시작 일시", colSpan: 1, rowSpan: 2, align: "center", width: "200px" },
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
        name: "이미지 설정",
        colSpan: 1,
        rowSpan: 2,
        align: "center",
        width: "150px"
      },
      { name: "참가금액", colSpan: 2, rowSpan: 2, align: "center" },
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
            전체
            <br /> 참여인원(명)
          </Typography>
        ),
        colSpan: 1,
        rowSpan: 2,
        align: "center",
        width: "150px"
      },
      { name: "상태", colSpan: 1, rowSpan: 2, align: "center", width: "150px" },
      { name: "편집", colSpan: 2, rowSpan: 2, align: "center", width: 100 },
      {
        name: (
          <Typography sx={{ fontSize: 14 }}>
            스케줄 <br /> 등록
          </Typography>
        ),
        colSpan: 1,
        rowSpan: 2,
        align: "center",
        width: 100
      }
    ],

    rows: scheduleList, // 테이블 바디

    autoHeightMax: 800
  };
  const Props = {
    footerBody: {
      length: scheduleList.length,
      footerText: "클릭하여 스케줄 생성",
      footerHref: "/schedule/create"
    },
    table: {
      tableProps
    }
  };
  return <TemplateTableListView {...Props} />;
};
export default ScheduleTableList;

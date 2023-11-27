import TemplateTableListView from "./template-table.list.view";
import { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import { Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { buttonPropsType } from "../../../atoms/button/button.view";
import { TableCellProps } from "@mui/material/TableCell";
import ButtonTableLinkView from "../../../atoms/button/button-table-link.view";
import { ButtonProps } from "@mui/material/Button/Button";
import { buttonListProps } from "../../instances/list/instances-table.list";
import { useRouter } from "next/router";
import { formatNumberListView, secondToMinute } from "../../../../utils/public/formatNumber";
import { TemplateV1CreateReq } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.req.dto";
import { TemplateV1FindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.res.dto";
import BoxFilePickerView from "../../../atoms/box/box-filePicker.view";

export type TemplateTableHeadTypes = {
  name: string | React.ReactNode;
  colSpan: number;
  rowSpan: number;
  align?: TableCellProps["align"];
  width?: number | string;
  height?: number | string;
  max?: number | string;
  flex?: number;
  padding?: TableCellProps["padding"];
  subcols?: TableLayoutProps["cols"];
};

export type TemplateTableListType = {
  button: buttonListProps<buttonPropsType>;
  templateListData: TemplateV1CreateReq[];
  open: {
    [key: string]: boolean;
  };
  forms: any;
};

type templateRowDataType<T> = {
  patchButton: T;
  createButton: T;
  deleteButton: T;
  readButton: T;
  allPeople: number;
};

export const TemplateTableHeads: TemplateTableHeadTypes[] = [
  { name: "토너먼트", colSpan: 1, rowSpan: 2, align: "center", height: "50px", width: "150px" },
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
        수수료율
        <br /> (%)
      </Typography>
    ),
    colSpan: 1,
    rowSpan: 2,
    align: "center"
  },
  { name: "인당 할당금액", colSpan: 1, rowSpan: 2, align: "center" },
  {
    name: "이벤트 여부",
    colSpan: 1,
    rowSpan: 2,
    align: "center",
    width: "120px"
  },
  {
    name: (
      <Typography sx={{ fontSize: 14 }}>
        이벤트 대회
        <br /> 상금
      </Typography>
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
  }
  // {
  //   name: "배팅 금액",
  //   colSpan: 2,
  //   rowSpan: 1,
  //   align: "center",
  //   subcols: [
  //     { name: "최소", colSpan: 1, rowSpan: 1, align: "center" },
  //     { name: "최대", colSpan: 1, rowSpan: 1, align: "center" }
  //   ]
  // },
  // {
  //   name: "배팅 시간",
  //   colSpan: 2,
  //   rowSpan: 1,
  //   align: "center",
  //   subcols: [
  //     { name: "시간1", colSpan: 1, rowSpan: 1, align: "center" },
  //     { name: "시간2", colSpan: 1, rowSpan: 1, align: "center" }
  //   ]
  // },
];

function TemplateTableList({ templateListData, button, open, forms }: TemplateTableListType) {
  const router = useRouter();
  const { patchButton, deleteButton, createButton } = button;
  const [templateList, setTemplateList] = useState<Partial<TemplateV1FindDataRes[] & templateRowDataType<ButtonProps>>[]>([]);
  useEffect(() => {
    let TemplateRowList = templateListData.map((item, index) => {
      // console.log(item);
      return {
        no: index + 1,
        template_name: item.template_name,
        participating_time: secondToMinute(item.participating_time), // 참가 시간
        room_headcount: item.room_headcount, // 방 인원
        phase: item.phase, // 총 단계
        image_by_phase: <BoxFilePickerView img={item.image_by_phase} />, // 이미지
        participation_fee_currency_code: item.participation_fee_currency_code.toUpperCase(), // 참가비 통화
        participation_fee_amount: formatNumberListView(item.participation_fee_amount), // 참가비
        participation_commission: item.participation_commission, // 수수료
        player_game_money: formatNumberListView(item.player_game_money), // 인당 할당금액
        tournament_type: item.tournament_type === "CommonTournament" ? "공통 토너먼트" : "이벤트 토너먼트",
        event_prize_money: formatNumberListView(item.event_prize_money), // 우승 상금
        is_allowed_free_coupon: item.is_allowed_free_coupon ? "사용" : "미사용",
        patchButton: <ButtonTableLinkView data-no={index + 1} {...patchButton} />,
        deleteButton: <ButtonTableLinkView data-no={index + 1} {...deleteButton} />,
        createButton: <ButtonTableLinkView data-no={index + 1} {...createButton} />
        // betting_amount_minimum: formatNumber(item.betting_amount_minimum), // 배팅 최소 금액
        // betting_amount_maximum: formatNumber(item.betting_amount_maximum), // 배팅 최대 금액
        // betting_time_gold: onTimeSecondsUnit(item.betting_time_gold), // 배팅 시간
        // betting_time_none: onTimeSecondsUnit(item.betting_time_none), // 배팅 시간
      };
    });
    setTemplateList([...TemplateRowList]);
  }, [templateListData, open, forms, router]);
  const tableProps: TableLayoutProps = {
    cols: [
      { name: "NO.", colSpan: 1, rowSpan: 2, align: "center", width: "50px" },
      ...TemplateTableHeads,
      { name: "편집", colSpan: 2, rowSpan: 2, align: "center", width: 100 },
      {
        name: (
          <Typography sx={{ fontSize: 14 }}>
            템플릿 <br /> 등록
          </Typography>
        ),
        colSpan: 1,
        rowSpan: 2,
        align: "center",
        width: 100
      }
    ],

    rows: templateList, // 테이블 바디

    autoHeightMax: 800
  };
  const Props = {
    footerBody: {
      length: templateList.length,
      footerText: "클릭하여 템플릿 생성",
      footerHref: "/template/create"
    },
    table: {
      tableProps
    }
  };
  return <TemplateTableListView {...Props} />;
}
export default TemplateTableList;

import React, { Dispatch, useEffect, useState } from "react";
import { TemplateTableHeads } from "../../molecules/template/list/template-table-list";

import { formatNumber, secondToMinute } from "../../../utils/public/formatNumber";
import TableDefaultView from "../../molecules/template/create/table-default.view";
import { TableLayoutProps } from "./tableLayout.view";
import ButtonTableLinkView from "../button/button-table-link.view";
import { useRouter } from "next/router";
import PaginationView from "../pagination/pagination.view";
import { TemplateV1FindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.res.dto";
import BoxFilePickerView from "../box/box-filePicker.view";

type TableTemplateLoadProps = {
  data: TemplateV1FindDataRes[];
  button: {
    text: string;
    onClick: (e: MouseEvent) => void;
  };

  setReadData: Dispatch<any>;
  readData: any;
  open: {
    [key: string]: boolean;
  };
  total: number;
  limit: number;
  page: number;
};
function TableTemplateLoad({ ...props }: TableTemplateLoadProps) {
  const { setReadData, open, total, limit, page, readData } = props;
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  // console.log(total / limit, page);
  useEffect(() => {
    const readDataSet = props.data.map((item, index) => {
      // console.log(props.data);
      // console.log(item.tournament_type);
      return {
        load: <ButtonTableLinkView data-no={index + 1} data-id={item.id} {...props.button} text={"불러오기"} />,
        no: page * limit + index + 1 - limit,
        template_name: item.template_name,
        participating_time: secondToMinute(item.participating_time),
        room_headcount: item.room_headcount, // 방 인원
        phase: item.phase, // 총 단계
        image_by_phase: <BoxFilePickerView img={item.image_by_phase} />, // 이미지
        participation_fee_currency_code: item.participation_fee_currency_code.toUpperCase(), // 참가비 통화
        participation_fee_amount: formatNumber(item.participation_fee_amount), // 참가비
        participation_commission: item.participation_commission, // 수수료
        player_game_money: formatNumber(item.player_game_money), // 인당 할당금액
        tournament_type: item.tournament_type === "CommonTournament" ? "공통 토너먼트" : "이벤트 토너먼트",
        event_prize_money: formatNumber(item.event_prize_money), // 이벤트 상금
        is_allowed_free_coupon: item.is_allowed_free_coupon ? "사용" : "미사용" // 무료쿠폰 사용
        // betting_time_gold: onTimeSecondsUnit(item.betting_time_gold), // 배팅 시간
        // betting_time_none: onTimeSecondsUnit(item.betting_time_none), // 배팅 시간
        // betting_amount_minimum: formatNumber(item.betting_amount_minimum),
        // betting_amount_maximum: formatNumber(item.betting_amount_maximum),
      };
    });
    // 테이블 데이터 (rows)
    setReadData([...readDataSet]);
    setRows([...readDataSet]);
    // console.log("open", open);
    // console.log("readData", readData);
  }, [open, router.query, readData]);

  const tableProps: TableLayoutProps = {
    cols: [{ name: "불러오기", colSpan: 1, rowSpan: 2, align: "center", width: "70px" }, { name: "NO.", colSpan: 1, rowSpan: 2, align: "center", width: "50px" }, ...TemplateTableHeads],

    rows: rows, // 테이블 바디

    autoHeightMax: 500
  };

  const Props = {
    table: {
      tableProps
    },
    paginationProps: {
      count: Math.ceil(total / limit) <= 1 ? 1 : Math.ceil(total / limit),
      page: page,
      onChange: (e: MouseEvent, page: number) => {
        return router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            page: page
          }
        });
      }
    }
  };

  return (
    <>
      <TableDefaultView {...Props} />
      <PaginationView {...Props.paginationProps} />
    </>
  );
  // return <></>;
}
export default TableTemplateLoad;

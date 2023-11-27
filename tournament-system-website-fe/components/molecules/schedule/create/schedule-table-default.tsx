import { Box, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import useInputHooks from "../../../../hooks/useInput.hooks";
import { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import { amount1Data, freeData, tournamentTypeData } from "../../../../utils/commonProps/select.Props";
import { TopBoxStyle } from "../../../../styles/layout";
import BoxTableTitleView from "../../../atoms/box/box-table-title.view";
import InputView from "../../../atoms/forms/input.view";
import NumberInputComponent from "../../../atoms/forms/input-number";
import TemplateSelectView from "../../template/forms/template-select.view";
import { TemplateTableHeadTypes } from "../../template/list/template-table-list";
import TableDefaultView from "../../template/create/table-default.view";
import { minuteToSecond, PowNumber } from "../../../../utils/public/formatNumber";
import { onUtcTimeChange } from "../../../../utils/public/timeChange";
import { checkText, CurrencyCodeInNumberCode, free_couponSelectGroups, NumberCodeInCurrencyCode, SelectOptionChange } from "../../../../utils/public/selectMap";
import dayjs, { Dayjs } from "dayjs";
import TemplateDateView from "../../template/forms/template-date.view";
import { useFormDataStore } from "../../../../stores/useFormData.store";
import { commonInputProps, rowItemCommonProps } from "../../template/create/template-table-default";
import SelectFilePicker from "../../../atoms/forms/select-filePicker";

export const scheduleTableHeads: TemplateTableHeadTypes[] = [
  { name: "토너먼트", colSpan: 1, rowSpan: 2, align: "center", width: "150px" },
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
    name: "이벤트 여부",
    colSpan: 1,
    rowSpan: 2,
    align: "center"
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
  //   name: "배팅 시간",
  //   colSpan: 2,
  //   rowSpan: 1,
  //   align: "center",
  //   subcols: [
  //     { name: "시간1", colSpan: 1, rowSpan: 1, align: "center" },
  //     { name: "시간2", colSpan: 1, rowSpan: 1, align: "center" }
  //   ]
  // },
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
];

function ScheduleTableDefault({ ...props }) {
  const { onForms, readOnly, data, forms } = props;
  const { formData, setFormData } = useFormDataStore();
  const { inputs, onChange, setInputs } = useInputHooks({
    schedule_name: "",
    total_phase: "",
    ...commonInputProps
  });
  const [dataProps, setDataProps] = useState(data);
  const [dateTime, setDateTime] = useState<Dayjs | null>(dataProps?.open_date_time ? dayjs(dataProps.open_date_time) : null);
  const [optionValue, setOptionValue] = useState<string>("0");
  const [couponValue, setCouponValue] = useState<string>("0");
  const [tournamentTypeValue, setTournamentTypeValue] = useState<string>("CommonTournament"); // 토너먼트 타입
  const [imageFile, setImageFile] = useState<any>(dataProps ? checkText(dataProps!.image_by_phase) : "NONE");
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {
    if (!dataProps) return;
    setTournamentTypeValue(dataProps.tournament_type);
    setCouponValue(free_couponSelectGroups(dataProps.is_allowed_free_coupon));
    setOptionValue(CurrencyCodeInNumberCode(dataProps.participation_fee_currency_code));
  }, [dataProps]);

  useEffect(() => {
    setFormData({});
  }, [dataProps]);

  useEffect(() => {
    if (dataProps) {
      // object.entries 를 사용하여 data 의 key 와 value 를 배열로 만들어준다.
      // reduce 를 사용하여 배열을 하나의 객체로 만들어준다.
      // 만들어진 객체를 setInputs 를 사용하여 inputs 에 넣어준다.
      // setInputs 를 사용하여 inputs 에 넣어준다.
      Object.entries(dataProps).reduce((acc, [key, value]) => {
        (acc as any)[key] = value;
        return acc;
      }, inputs);
    }

    if (formData.schedule_name) {
      setDataProps(formData);
      setDateTime(dayjs(formData.open_date_time));
      setOptionValue(CurrencyCodeInNumberCode(formData.participation_fee_currency_code));
      setCouponValue(free_couponSelectGroups(formData.is_allowed_free_coupon));
    }
  }, [formData, dataProps]);

  useEffect(() => {
    /* 폼 전달 */
    onForms("schedule_name", inputs.schedule_name);
    onForms("open_date_time", onUtcTimeChange(String(dateTime)));
    onForms("participating_time", minuteToSecond(inputs.participating_time)); // 참여 시간
    onForms("room_headcount", Number(inputs.room_headcount)); // 방 인원수
    onForms("total_phase", Number(inputs.total_phase)); // 단계
    onForms("image_by_phase", inputs.image_by_phase); // 이미지 설정
    onForms("participation_fee_currency_code", NumberCodeInCurrencyCode(optionValue));
    onForms("participation_fee_amount", Number(inputs.participation_fee_amount));
    onForms("participation_commission", Number(inputs.participation_commission)); // 참여 수수료
    onForms("total_participant_count", PowNumber(inputs.room_headcount, inputs.total_phase)); // 총 참여자 수
    onForms("player_game_money", Number(inputs.player_game_money)); // 플레이어 게임 금액
    onForms("event_prize_money", Number(inputs.event_prize_money)); // 이벤트 우승 상금
    onForms("is_allowed_free_coupon", couponValue === "1");
    onForms("tournament_type", tournamentTypeValue);
    onForms("betting_time_gold", Number(inputs.betting_time_gold)); //  골드 베팅 시간
    onForms("betting_time_none", Number(inputs.betting_time_none)); // 논 베팅 시간
    onForms("betting_amount_minimum", Number(inputs.betting_amount_minimum)); // 최소 베팅 금액
    onForms("betting_amount_maximum", Number(inputs.betting_amount_maximum)); // 최대 베팅 금액
  }, [rows, data, inputs, dateTime, optionValue, couponValue, tournamentTypeValue, forms, formData, dataProps]);

  useEffect(() => {
    const rowItemProps = {
      ...rowItemCommonProps({ readOnly, inputs, onChange, setInputs }),
      schedule_name: {
        name: "schedule_name",
        defaultValue: inputs?.schedule_name,
        onChange: onChange,
        placeholder: "입력",
        readOnly: readOnly
      }, // 스케줄 이름
      open_date_time: {
        // 시작 시간
        name: "open_date_time",
        dateTime: dateTime,
        setDateTime: setDateTime,
        dateChange: dateChange,
        readOnly: readOnly
      }, // 시작 시간
      total_phase: {
        name: "total_phase",
        defaultValue: inputs?.total_phase,
        onChange: onChange,
        type: "text",
        maxLength: 2,
        placeholder: "입력",
        width: "50px",
        readOnly: readOnly
      }, // 단계
      image_by_phase: {
        name: "image_by_phase",
        defaultValue: inputs?.image_by_phase,
        phase: inputs?.total_phase,
        setInputs: setInputs,
        imageFile: imageFile,
        setImageFile: setImageFile,
        ...readOnly
      }, // 이미지
      total_participant_count: {
        name: "total_participant_count",
        defaultValue: PowNumber(inputs?.room_headcount, inputs?.total_phase),
        placeholder: "방 인원수 ^ 단계",
        width: "120px",
        readOnly: true
      }, // 총 참여자 수
      participation_fee_currency_code: {
        optionValue: optionValue,
        select: amountSelect,
        width: "100px",
        readOnly: readOnly
      },
      is_allowed_free_coupon: {
        optionValue: couponValue,
        select: couponSelect,
        width: "120px",
        readOnly: readOnly
      },
      tournament_type: {
        optionValue: tournamentTypeValue,
        select: tournamentSelect,
        width: "120px",
        readOnly: readOnly
      }
    };
    //테이블 입력값받는 td(newValue) => setValue(newValue)
    // console.log(dataProps);
    return setRows([
      {
        schedule_name: <InputView {...rowItemProps.schedule_name} />,
        open_date_time: <TemplateDateView {...rowItemProps.open_date_time} />,
        participating_time: <NumberInputComponent {...rowItemProps.participating_time} />,
        room_headcount: <NumberInputComponent {...rowItemProps.room_headcount} />,
        total_phase: <NumberInputComponent {...rowItemProps.total_phase} />, // 단계
        image_by_phase: <SelectFilePicker {...rowItemProps.image_by_phase} />,
        participation_fee_currency_code: <TemplateSelectView {...rowItemProps.participation_fee_currency_code} />,
        participation_fee_amount: <NumberInputComponent {...rowItemProps.participation_fee_amount} />,
        participation_commission: <NumberInputComponent {...rowItemProps.participation_commission} />,
        total_participant_count: <InputView {...rowItemProps.total_participant_count} />,
        player_game_money: <NumberInputComponent {...rowItemProps.player_game_money} />,
        tournament_type: <TemplateSelectView {...rowItemProps.tournament_type} />,
        event_prize_money: <NumberInputComponent {...rowItemProps.event_prize_money} />, // 이벤트 우승 상금
        is_allowed_free_coupon: <TemplateSelectView {...rowItemProps.is_allowed_free_coupon} />
        // betting_amount_minimum: <NumberInputComponent {...rowItemProps.betting_amount_minimum} />,
        // betting_amount_maximum: <NumberInputComponent {...rowItemProps.betting_amount_maximum} />,
        // betting_time_gold: <NumberInputComponent {...rowItemProps.betting_time_gold} />,
        // betting_time_none: <NumberInputComponent {...rowItemProps.betting_time_none} />,
      }
    ]);
  }, [inputs, optionValue, couponValue, readOnly, data, formData, dataProps, tournamentTypeValue, imageFile]);

  const dateChange = (newValue: Dayjs | null) => {
    return setDateTime(newValue);
  };

  const couponSelect = {
    selectItem: {
      optionData: freeData,
      defaultSelect: {
        value: couponValue,
        onChange: (e: ChangeEvent<HTMLSelectElement>) => SelectOptionChange(e, setCouponValue)
      }
    }
  };
  const tournamentSelect = {
    selectItem: {
      optionData: tournamentTypeData,
      defaultSelect: {
        value: tournamentTypeValue,
        onChange: (e: ChangeEvent<HTMLSelectElement>) => SelectOptionChange(e, setTournamentTypeValue)
      }
    }
  };
  const amountSelect = {
    selectItem: {
      optionData: amount1Data,
      defaultSelect: {
        value: optionValue,
        onChange: (e: ChangeEvent<HTMLSelectElement>) => SelectOptionChange(e, setOptionValue)
      }
    }
  };

  const tableProps: TableLayoutProps = {
    cols: [...scheduleTableHeads],
    rows: rows, // 테이블 바디
    autoHeightMax: 400
  };

  const Props = {
    inputs,
    onChange,
    table: {
      tableProps
    }
  };

  return (
    <>
      <Box css={TopBoxStyle} sx={{ marginTop: "-15px!important" }}>
        <BoxTableTitleView text={"기본설정"} />
      </Box>

      <TableDefaultView {...Props} />
    </>
  );
}

export default ScheduleTableDefault;

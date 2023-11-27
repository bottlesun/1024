import TableDefaultView from "./table-default.view";
import { Box } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import useInputHooks from "../../../../hooks/useInput.hooks";
import { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import { amount1Data, freeData, tournamentTypeData } from "../../../../utils/commonProps/select.Props";
import { TopBoxStyle } from "../../../../styles/layout";
import BoxTableTitleView from "../../../atoms/box/box-table-title.view";
import { TemplateTableHeads } from "../list/template-table-list";
import InputView from "../../../atoms/forms/input.view";
import NumberInputComponent from "../../../atoms/forms/input-number";
import TemplateSelectView from "../forms/template-select.view";
import { checkText, CurrencyCodeInNumberCode, free_couponSelectGroups, handleCreateSymbol, NumberCodeInCurrencyCode, SelectOptionChange } from "../../../../utils/public/selectMap";
import { onTimeSecondsUnit } from "../../../../utils/public/timeChange";
import { formatNumber, minuteToSecond, secondToMinute } from "../../../../utils/public/formatNumber";
import SelectFilePicker from "../../../atoms/forms/select-filePicker";

export const commonInputProps = {
  participating_time: "", // 참가시간
  image_by_phase: [], // 이미지
  room_headcount: "", // 방 인원
  optionValue: "", // 참가비 화폐
  participation_fee_amount: "", // 참가비
  participation_commission: "", // 참가수수료
  betting_amount_minimum: "500000", // 베팅 최소금액
  betting_amount_maximum: "10000000", // 베팅 최대금액
  player_game_money: "10000000", // 플레이어 게임머니
  betting_time_gold: "10", // 베팅시간
  betting_time_none: "5", // 베팅시간
  event_prize_money: "" // 이벤트 대회 상금
};

export const rowItemCommonProps = ({ readOnly, inputs, onChange }: any) => {
  return {
    readOnly: readOnly, // 읽기모드
    participating_time: {
      name: "participating_time",
      defaultValue: secondToMinute(inputs?.participating_time),
      onChange: onChange,
      type: "text",
      placeholder: "입력",
      width: "70px"
    }, // 참가시간
    room_headcount: {
      name: "room_headcount",
      defaultValue: inputs?.room_headcount,
      onChange: onChange,
      type: "text",
      maxLength: 4,
      placeholder: "입력",
      width: "70px",
      ...readOnly
    }, // 방 인원
    participation_fee_amount: {
      name: "participation_fee_amount",
      defaultValue: formatNumber(inputs?.participation_fee_amount),
      onChange: onChange,
      placeholder: "입력",
      width: "100px",
      ...readOnly
    }, // 참가비
    participation_commission: {
      name: "participation_commission",
      defaultValue: handleCreateSymbol(inputs?.participation_commission, "%"),
      onChange: onChange,
      placeholder: "입력(%)",
      maxLength: 3,
      width: "75px",
      ...readOnly
    }, // 참가수수료
    player_game_money: {
      name: "player_game_money",
      defaultValue: formatNumber(inputs?.player_game_money),
      onChange: onChange,
      placeholder: "입력",
      width: "120px",
      ...readOnly
    }, // 플레이어 게임머니
    event_prize_money: {
      name: "event_prize_money",
      defaultValue: formatNumber(inputs?.event_prize_money),
      onChange: onChange,
      placeholder: "입력",
      width: "75px",
      ...readOnly
    }, // 이벤트 대회 상금
    betting_amount_minimum: {
      name: "betting_amount_minimum",
      defaultValue: formatNumber(inputs?.betting_amount_minimum),
      onChange: onChange,
      placeholder: "입력",
      width: "75px",
      ...readOnly
    }, // 베팅 최소금액
    betting_amount_maximum: {
      name: "betting_amount_maximum",
      defaultValue: formatNumber(inputs?.betting_amount_maximum),
      onChange: onChange,
      placeholder: "입력",
      width: "75px",
      ...readOnly
    }, // 베팅 최대금액
    betting_time_gold: {
      name: "betting_time_gold",
      defaultValue: onTimeSecondsUnit(Number(inputs?.betting_time_gold)),
      onChange: onChange,
      placeholder: "입력",
      width: "75px",
      ...readOnly
    }, // 베팅시간
    betting_time_none: {
      name: "betting_time_none",
      defaultValue: onTimeSecondsUnit(Number(inputs?.betting_time_none)),
      onChange: onChange,
      placeholder: "입력",
      width: "75px",
      ...readOnly
    } // 베팅시간
  };
};

function TemplateTableDefault({ ...props }) {
  const { onForms, readOnly, data, forms } = props;
  const { inputs, onChange, setInputs } = useInputHooks({
    template_name: "",
    phase: "",
    ...commonInputProps
  });
  const [optionValue, setOptionValue] = useState<string>(data ? CurrencyCodeInNumberCode(data.participation_fee_currency_code) : "0");
  const [couponValue, setCouponValue] = useState<string>(data ? free_couponSelectGroups(data.is_allowed_free_coupon) : "0");
  const [tournamentTypeValue, setTournamentTypeValue] = useState<string>(data ? data.tournament_type : "CommonTournament"); // 토너먼트 타입
  const [imageFile, setImageFile] = useState<any>(data ? checkText(data!.image_by_phase) : "NONE");

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    // object.entries 를 사용하여 data 의 key 와 value 를 배열로 만들어준다.
    // reduce 를 사용하여 배열을 하나의 객체로 만들어준다.
    // 만들어진 객체를 setInputs 를 사용하여 inputs 에 넣어준다.
    // setInputs 를 사용하여 inputs 에 넣어준다.
    if (data) {
      Object.entries(data).reduce((acc, [key, value]) => {
        (acc as any)[key] = value;
        return acc;
      }, inputs);
    }
  }, []);
  useEffect(() => {
    /* 폼 전달 */
    onForms("template_name", inputs.template_name);
    onForms("tournament_type", tournamentTypeValue);
    onForms("participating_time", minuteToSecond(inputs.participating_time)); // 참여 시간
    onForms("room_headcount", Number(inputs.room_headcount)); // 방 인원수
    onForms("phase", Number(inputs.phase)); // 단계
    onForms("image_by_phase", inputs.image_by_phase); // 이미지 설정
    onForms("participation_fee_currency_code", NumberCodeInCurrencyCode(optionValue));
    onForms("participation_fee_amount", Number(inputs.participation_fee_amount));
    onForms("participation_commission", Number(inputs.participation_commission)); // 참여 수수료
    onForms("player_game_money", Number(inputs.player_game_money)); // 플레이어 게임 금액
    onForms("event_prize_money", Number(inputs.event_prize_money)); // 이벤트 우승 상금
    onForms("is_allowed_free_coupon", couponValue === "1");
    onForms("betting_time_gold", Number(inputs.betting_time_gold)); //  골드 베팅 시간
    onForms("betting_time_none", Number(inputs.betting_time_none)); // 논 베팅 시간
    onForms("betting_amount_minimum", Number(inputs.betting_amount_minimum)); // 최소 베팅 금액
    onForms("betting_amount_maximum", Number(inputs.betting_amount_maximum)); // 최대 베팅 금액
    //   console.log(forms, "forms");
  }, [rows, data, inputs, optionValue, couponValue, forms]);

  useEffect(() => {
    const rowItemProps = {
      ...rowItemCommonProps({ readOnly, inputs, onChange, setInputs }),
      template_name: {
        name: "template_name",
        defaultValue: inputs?.template_name,
        onChange: onChange,
        placeholder: "입력",
        ...readOnly,
        width: "200px"
      },
      image_by_phase: {
        name: "image_by_phase",
        defaultValue: inputs?.image_by_phase,
        phase: inputs?.phase,
        setInputs: setInputs,
        imageFile: imageFile,
        setImageFile: setImageFile,
        ...readOnly
      }, // 이미지
      phase: {
        name: "phase",
        defaultValue: inputs?.phase,
        onChange: onChange,
        type: "text",
        maxLength: 2,
        placeholder: "입력",
        width: "50px",
        ...readOnly
      }, // 참가시간
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
        ...readOnly
      },
      tournament_type: {
        optionValue: tournamentTypeValue,
        select: tournamentSelect,
        width: "120px",
        ...readOnly
      }
    };
    //테이블 입력값받는 td(newValue) => setValue(newValue)
    return setRows([
      {
        template_name: <InputView {...rowItemProps.template_name} />,
        participating_time: <NumberInputComponent {...rowItemProps.participating_time} />,
        room_headcount: <NumberInputComponent {...rowItemProps.room_headcount} />,
        phase: <NumberInputComponent {...rowItemProps.phase} />,
        image_by_phase: <SelectFilePicker {...rowItemProps.image_by_phase} />,
        participation_fee_currency_code: <TemplateSelectView {...rowItemProps.participation_fee_currency_code} />,
        participation_fee_amount: <NumberInputComponent {...rowItemProps.participation_fee_amount} />,
        participation_commission: <NumberInputComponent {...rowItemProps.participation_commission} />,
        player_game_money: <NumberInputComponent {...rowItemProps.player_game_money} />,
        tournament_type: <TemplateSelectView {...rowItemProps.tournament_type} />,
        event_prize_money: <NumberInputComponent {...rowItemProps.event_prize_money} />,
        is_allowed_free_coupon: <TemplateSelectView {...rowItemProps.is_allowed_free_coupon} />
        // betting_amount_minimum: <NumberInputComponent {...rowItemProps.betting_amount_minimum} />,
        // betting_amount_maximum: <NumberInputComponent {...rowItemProps.betting_amount_maximum} />,
        // betting_time_gold: <NumberInputComponent {...rowItemProps.betting_time_gold} />,
        // betting_time_none: <NumberInputComponent {...rowItemProps.betting_time_none} />,
      }
    ]);
  }, [inputs, optionValue, couponValue, readOnly, data, tournamentTypeValue]);

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
    cols: [...TemplateTableHeads],
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
      <Box css={TopBoxStyle} sx={{ marginTop: "-15px" }}>
        <BoxTableTitleView text={"기본설정"} />
      </Box>
      <TableDefaultView {...Props} />
    </>
  );
}

export default TemplateTableDefault;

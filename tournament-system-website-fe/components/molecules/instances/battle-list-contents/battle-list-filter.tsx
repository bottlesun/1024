import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FormHeadProps } from "../../../atoms/forms/form-head.view";
import { buttonGroupProps } from "../../../atoms/button/button-group.view";
import { selectGroupProps } from "../../../atoms/forms/select-group.view";
import BattleListFilterView from "./battle-list-filter.view";
import { UseFormsHook } from "../../../../hooks/useForms.hook";
import useSelectHook from "../../../../hooks/useSelectHook";
import { modalSetProps } from "../../../atoms/tables/table-battle/table-battle-summary-info-body.view";
import { useRouter } from "next/router";
import { MatchV1PhaseFindDataRes, MatchV1ProgressDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.res.dto";
import { filterText } from "../../../../utils/public/filterText";

export type tournamentSelect = {
  name: string;
  value: number | string;
};

export type commonBattleListProps = {
  open: any;
  setOpen: Dispatch<{ alert: boolean }>;
  clickTableState: boolean;
  onForms: (key: string, value: any) => boolean | void;
  handleOpen: (key: string) => void;
  limit?: number;
  page?: number;
  total?: number;
  userId?: string;
  start_at?: string;
  schedule_name?: string;
} & UseFormsHook &
  modalSetProps;

export type battleListFilterProps = {
  roomListData: MatchV1PhaseFindDataRes[];
  matchSelectData: MatchV1ProgressDataRes[];
  roomSelect: tournamentSelect[];
  uniqueDates: string[];
  limit: number;
  setClickTableState: Dispatch<null | boolean>;
} & commonBattleListProps;
const BattleListFilter = ({ ...battleListProps }: battleListFilterProps) => {
  const { open, handleOpen, matchSelectData, roomListData, setModalContent, setModalTitle, setModalButtonItem, setClickTableState, clickTableState, setModalChange, onForms, forms, uniqueDates } = battleListProps;
  const router = useRouter();
  const { onChange, select, setSelect } = useSelectHook({ id: `${router.query.id ? router.query.id : "all"}`, phase: "all", room: "all" });
  const [date, setDate] = useState<Dayjs | null>(router.query.started_at ? dayjs(String(router.query.started_at)) : null);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [userSearch, setUserSearch] = useState({ userId: "", matchId: `${router.query.id ? filterText(router.query.id as string) : ""}`, matchName: "" });

  const [matchSelect, setMatchSelect] = useState<tournamentSelect[] | any>([]);
  const [phaseSelect, setPhaseSelect] = useState<tournamentSelect[] | any>([]);
  const [roomSelect, setRoomSelect] = useState<tournamentSelect[] | any>([]);
  const { id, phase, room } = select;
  const { userId, matchId, matchName } = userSearch;
  useEffect(() => {
    /*
     * @description 셀렉트 박스 구성
     * */

    // 토너먼트 목록
    const matchArray = [...matchSelectData].map((item, num) => {
      return { name: item.schedule_name + ` (${item.id})`, value: item.id };
    });
    // console.log(matchArray, ";matchArray");
    setMatchSelect([...matchArray]);

    // create Select Option
    // 방목록
    const roomArray = [...roomListData].map((item: MatchV1PhaseFindDataRes) => {
      return { name: "방" + item.sequence, value: item.sequence };
    });
    setRoomSelect([...roomArray]);

    // 단계 목록
    if (matchSelectData[0] === undefined) return setPhaseSelect([]);
    const phaseArray = [...new Array(matchSelectData[0].total_phase)].map((item, num) => {
      return { name: `${num + 1}단계`, value: num + 1 };
    });
    setPhaseSelect([...phaseArray]);

    if (router.query.id) {
      // 토너먼트 id가 있을 경우
      setSelect({ ...select, id: router.query.id as string });
    }
  }, [matchSelectData, roomListData, router.query, forms]);

  useEffect(() => {
    /*
     * @description date 값이 변경되면 endDate 값도 변경
     * endDate 값보다 7일 이전 값이 되도록 date 값을 설정 하는 로직
     * */
    (() => {
      const dateValue = new Date(date as any);
      const endDateValue = new Date(endDate as any);
      const diffTime = Math.abs(endDateValue.getTime() - dateValue.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      /* CompareNumbers date 가 endDate 보다 크면? (숫자 비교) */
      /* endDate의 값이 없다면 endDate - 7일 값으로 이동 */
      if (date === undefined || date === null) {
        return setDate(endDate!.subtract(7, "day"));
      }

      if (endDateValue < dateValue) {
        /* alert modal open + endDate 값 제거 */
        setModalChange("alert");
        handleOpen("alert");
        setModalTitle(`토너먼트 인스턴트`);
        setModalButtonItem([]);
        setModalContent(<p>시작 날짜를 넘길 수 없습니다.</p>);
        return setEndDate(date?.add(7, "day"));
      }
      if (diffDays > 7) {
        /* alert modal open + endDate 값 제거 */
        return setEndDate(date?.add(7, "day"));
      }
    })();
  }, [date, endDate]);

  /*
   * @name handleInput
   * @description input value 값 변경
   * */
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserSearch({
      ...userSearch,
      [name]: value
    });
  };

  /*
   * @name handleSelectValue
   * @description select value 값 변경
   * */
  const handleSelectValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setSelect({
      ...select,
      [name]: value
    });
  };

  /*
   * @name handleChangeId
   * @description 토너먼트 id가 있을 경우 matchId를 반환 없을 경우 id를 반환
   * */
  const handleChangeId = () => {
    if (matchId) return matchId;
    return id;
  };

  /*조회*/
  const handleFormButton = async () => {
    // console.log("router", router.query);

    onForms("phase", phase);
    onForms("room", room);
    onForms("id", id);

    setClickTableState(!clickTableState);
    return router.push({
      pathname: router.pathname,
      query: { userID: userId.replace(/^\s+|\s+$/gm, ""), started_at: date?.format("YYYY-MM-DD"), ended_at: endDate?.format("YYYY-MM-DD"), phase: phase, room: room, id: handleChangeId(), schedule_name: matchName.replace(/^\s+|\s+$/gm, "") }
    });
  };

  /*초기화*/
  const handleResetButton = () => {
    setSelect({ id: "all", phase: "all", room: "all" });
    setUserSearch({ userId: "", matchId: "", matchName: "" });
    setDate(null);
    setEndDate(dayjs());
    onForms("phase", "all");
    onForms("room", "all");
    onForms("no", "all");
    setClickTableState(false);

    return router.push({
      pathname: router.pathname,
      query: {}
    });
  };
  const props = {
    DateGroup: {
      uniqueDates: uniqueDates,
      formHeadProps: {
        sx: { textAlign: "center" },
        labelTitle: "날짜"
      } as FormHeadProps,
      DateItem: [
        { value: date, onChange: (newValue: Dayjs | null) => setDate(newValue), maxDate: dayjs() },
        {
          value: endDate,
          onChange: (newValue: Dayjs | null) => setEndDate(newValue),
          maxDate: date?.add(10, "day")
        }
      ]
    },
    inputUserIdSearch: {
      inputItem: [{ id: "userSearch", placeholder: "아이디를입력하세요.", formHeadProps: { labelTitle: "유저 검색", sx: { textAlign: "center" } }, onChange: handleInput, value: userId, name: "userId" }]
    },
    inputTournamentIdSearch: {
      inputItem: [{ id: "userSearch", placeholder: "아이디를입력하세요.", formHeadProps: { labelTitle: "토너먼트 ID", sx: { textAlign: "center" } }, onChange: handleInput, value: matchId, name: "matchId" }]
    },
    inputTournamentItemSearch: {
      inputItem: [{ id: "userSearch", placeholder: "아이디를입력하세요.", formHeadProps: { labelTitle: "토너먼트 이름", sx: { textAlign: "center" } }, onChange: handleInput, value: matchName, name: "matchName" }]
    },
    tournamentSelectItem: {
      optionData: [{ name: "모든 토너먼트", value: "all" }, ...matchSelect],
      formHeadProps: { labelTitle: "토너먼트", sx: { textAlign: "center" } },
      defaultSelect: {
        value: id,
        onChange: handleSelectValue,
        name: "id"
      }
    } as selectGroupProps,
    stageSelectItem: {
      optionData: [{ name: "단계를 선택하세요", value: "all" }, ...phaseSelect],
      formHeadProps: { labelTitle: "단계", sx: { textAlign: "center" } },
      defaultSelect: {
        value: phase,
        onChange: handleSelectValue,
        name: "phase"
      }
    } as selectGroupProps,
    roomSelectItem: {
      optionData: [{ name: "방을 선택하세요", value: "all" }, ...roomSelect],
      formHeadProps: { labelTitle: "방", sx: { textAlign: "center" } },
      defaultSelect: {
        value: room,
        onChange: handleSelectValue,
        name: "room"
      }
    } as selectGroupProps,
    buttonGroups: {
      buttonItem: [
        { id: "search", size: "medium", text: "조회", onClick: handleFormButton, variant: "outlined" },
        { id: "reset", size: "medium", text: "초기화", onClick: handleResetButton, variant: "outlined" }
      ],
      buttonPosition: {
        justifyContent: "center",
        fill: "100%"
      }
    } as buttonGroupProps
  };

  return <BattleListFilterView {...props} />;
};

export default BattleListFilter;

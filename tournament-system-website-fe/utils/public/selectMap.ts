import { ChangeEvent, Dispatch } from "react";

export const statusSelectGroups = (value: string) => {
  switch (value) {
    case "대기-1단계":
      return "wait-step1";
    case "진행중 1단계":
      return "progress-step1";
    case "완료-1단계":
      return "done-step1";
    case "대기-2단계":
      return "wait-step2";
    case "진행중-2단계":
      return "progress-step2";
    case "완료-2단계":
      return "done-step2";
    case "대기-3단계":
      return "wait-step3";
    case "진행중-3단계":
      return "progress-step3";
    case "완료-3단계":
      return "done-step3";
    case "대기-4단계":
      return "wait-step4";
    case "진행중-4단계":
      return "progress-step4";
    case "완료-4단계":
      return "done-step4";
    case "대기-5단계":
      return "wait-step5";
    case "진행중-5단계":
      return "progress-step5";
    case "완료-5단계":
      return "done-step5";
    default:
      return "all";
  }
};

export const roomSelectGroups = (value: string) => {
  switch (value) {
    case "방1":
      return "room1";
    case "방2":
      return "room2";
    case "방3":
      return "room3";
    case "방4":
      return "room4";
    case "방5":
      return "room5";
    default:
      return "all";
  }
};

export const statusStringChange = (value: string) => {
  switch (value) {
    case "stop":
      return "중지";
    case "progress":
      return "진행중";
    case "done":
      return "완료";
    default:
      return "대기";
  }
};

export const free_couponSelectGroups = (value: boolean | null) => {
  switch (value) {
    case true:
      return "1"; // 무료
    default:
      return "2"; // 유료
  }
};

export const CurrencyCodeInNumberCode = (value: string) => {
  switch (value.toUpperCase()) {
    case "KRW":
      return "1";
    case "USD":
      return "2";
    case "JPY":
      return "3";
    case "CNY":
      return "4";
    case "PHP":
      return "5";
    case "EUR":
      return "6";
    default:
      return "0";
  }
};

export const NumberCodeInCurrencyCode = (value: string) => {
  switch (value) {
    case "1":
      return "krw";
    case "2":
      return "usd";
    case "3":
      return "jpy";
    case "4":
      return "cny";
    case "5":
      return "php";
    case "6":
      return "eur";
    default:
      return "0";
  }
};

export const tournamentTypeValueCode = (value: string) => {
  console.log(value, "value");
  switch (value) {
    case "1":
      return "EventTournament";
    default:
      return "CommonTournament";
  }
};

export const tournamentTypeCodeValue = (value: string) => {
  switch (value) {
    case "EventTournament":
      return "1";
    default:
      return "0";
  }
};

/*
 * @name checkText
 * @description 파일명이 없을 경우 NONE으로 반환
 * */
export function checkText(text: string[]) {
  // console.log(text, "text");
  const validValues = ["FREE", "STG 1", "STG 2", "STG 3", "STG 4", "EVENT"];
  if (text === null) return "NONE";
  if (!text) return "NONE";

  return validValues.includes(text[0]) ? text[0] : "NONE";
}

/*
 * @name SelectOptionChange
 * @param e: ChangeEvent<HTMLSelectElement>
 * @param setOptionValue: any
 * @description
 * select 태그의 옵션을 변경할 때 사용하는 함수
 * */
export const SelectOptionChange = (e: ChangeEvent<HTMLSelectElement>, setOptionValue: Dispatch<any>) => {
  return setOptionValue(e.target.value);
};

/*
 * @name handleCreateSymbol
 * @param value: number | string
 * @param symbol: string
 * @description
 *  숫자에 원하는 기호를 붙여서 반환하는 함수
 * */
export const handleCreateSymbol = (value: number | string, symbol: string) => {
  if (value === "" || value === undefined || value === null) return "";
  return value + symbol;
};

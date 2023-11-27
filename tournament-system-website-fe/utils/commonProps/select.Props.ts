export type selectDataProps = {
  name: string;
  value: string;
};

export const selectDummyData: selectDataProps[] = [
  { name: "선택해주세요", value: "0" },
  { name: "The Shawshank Redemption", value: "1" },
  { name: "The Godfather", value: "2" },
  { name: "The Godfather: Part II", value: "3" },
  { name: "The Dark Knight", value: "4" },
  { name: "12 Angry Men", value: "5" },
  { name: "Schindler's List", value: "6" },
  { name: "Pulp Fiction", value: "7" }
];

export const freeData: selectDataProps[] = [
  { name: "선택", value: "0" },
  { name: "가능", value: "1" },
  { name: "불가능", value: "2" }
];
export const amount1Data: selectDataProps[] = [
  { name: "선택", value: "0" },
  { name: "한국 KRW ", value: "1" },
  { name: "미국 USD", value: "2" },
  { name: "일본 JPY", value: "3" },
  { name: "중국 CNY", value: "4" },
  { name: "필리핀 PHP ", value: "5" },
  { name: "유럽연합 EUR ", value: "6" }
];

export const tournamentTypeData: selectDataProps[] = [
  { name: "공통 토너먼트", value: "CommonTournament" },
  { name: "이벤트 토너먼트", value: "EventTournament" }
];

export const filePickerData: selectDataProps[] = [
  { name: "이미지를 선택하세요", value: "NONE" },
  { name: "FREE", value: "FREE" },
  { name: "STG 1", value: "STG 1" },
  { name: "STG 2", value: "STG 2" },
  { name: "STG 3", value: "STG 3" },
  { name: "STG 4", value: "STG 4" },
  { name: "EVENT", value: "EVENT" }
];

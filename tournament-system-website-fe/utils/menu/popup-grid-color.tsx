export type GridType = {
  id: number;
  color: string;
  onClick: () => void;
};
export const GridItem: GridType[] = [
  {
    id: 1,
    color: "#FF4C4C",
    onClick: () => console.log("빨간색")
  },
  {
    id: 2,
    color: "#f5c368",
    onClick: () => console.log("주황색")
  },
  {
    id: 3,
    color: "#fdfd5d",
    onClick: () => console.log("노란색")
  },
  {
    id: 4,
    color: "#9bec9b",
    onClick: () => console.log("초록색")
  },
  {
    id: 5,
    color: "#4f4fff",
    onClick: () => console.log("파란색")
  },
  {
    id: 6,
    color: "#a246e6",
    onClick: () => console.log("보라색")
  },
  {
    id: 7,
    color: "White",
    onClick: () => console.log("하얀색")
  },
  {
    id: 8,
    color: "black",
    onClick: () => console.log("검정색")
  },
  {
    id: 9,
    color: "linear-gradient(to right, #121FCF 0%, #CF1512 100%)",
    onClick: () => console.log("그라데이션")
  }
];

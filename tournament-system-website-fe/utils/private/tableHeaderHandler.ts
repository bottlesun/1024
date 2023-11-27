import CSS from "csstype";

type DivisibleHeaderType = {
  main: string;
  sub: string[];
};

export type _TableHeaderType = {
  label: string;
  align: "inherit" | "left" | "center" | "right" | "justify";
  style: CSS.Properties;
}[];

type TableHeaderType = (string | DivisibleHeaderType)[];

const tableHeaderHandler = (...header:any) => {
  return header.map((item:any) => ({
    label: item,
    align: "center",
    style: {
      minWidth: "100px",
      whiteSpace: "nowrap",
      wordWrap: "break-word"
    }
  }));
};

export default tableHeaderHandler;

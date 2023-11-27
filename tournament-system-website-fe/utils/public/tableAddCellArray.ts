import { TableLayoutProps } from "../../components/atoms/tables/tableLayout.view";

/*
 * @param cols : "colsArrayList"
 * @description : "cols 갯수에 따른 auto array 생성"
 * */
export const tableAddCellArray = (cols: TableLayoutProps["cols"]) => {
  const array = [] as TableLayoutProps["cols"];
  cols.map((item, num) => {
    if (item.subcols) {
      array.push(...tableAddCellArray(item.subcols));
      item = 0 as any;
    }
    if (item.colSpan >= 2) {
      for (let i = 1; i < item.colSpan; i++) {
        array.push(item);
      }
    }
    array.push(item);
  });
  return array.filter((item) => !(item === (0 as any)));
};

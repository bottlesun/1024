import React, { useState } from "react";
import TableLayoutView, { TableLayoutProps } from "../../../atoms/tables/tableLayout.view";
import { tableData } from "../../../../utils/commonProps/table.Props";
import useCheckedHook from "../../../../hooks/useChecked.hook";
import TableHeadView from "../../../atoms/tables/table-head.view";
import TableBodyView from "../../../atoms/tables/table-body.view";

const Tablelayout = () => {
  const [rowData, setRowData] = useState([...tableData]);
  const { onChecked, onSelectAllChecked, checkItems } = useCheckedHook(rowData);

  const props: TableLayoutProps = {
    cols: [
      // 테이블 헤더 1행
      { name: "title1", colSpan: 1, rowSpan: 2, align: "center", padding: "checkbox", width: "50px" },
      { name: "title2", colSpan: 1, rowSpan: 2, align: "center" },
      { name: "title3", colSpan: 2, rowSpan: 2, align: "center" },
      {
        name: "title4",
        colSpan: 2,
        rowSpan: 1,
        align: "center",
        subcols: [
          // 테이블 헤더 2행
          { name: "max", colSpan: 1, rowSpan: 1, align: "center" },
          { name: "min", colSpan: 1, rowSpan: 1, align: "center" }
        ]
      }
    ],
    rows: rowData, // 테이블 바디
    onChecked: onChecked,
    onSelectAllChecked: onSelectAllChecked,
    checkItems: checkItems,
    autoHeightMax: 400
  };

  return (
    <TableLayoutView {...props}>
      <TableHeadView {...props} />
      <TableBodyView {...props} />
    </TableLayoutView>
  );
};

export default Tablelayout;

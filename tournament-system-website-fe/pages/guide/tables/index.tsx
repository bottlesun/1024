import BoxTitleSeo from "../../../components/atoms/box/box-title-seo";
import Layout from "../../../components/organisms/layout/layout";
import ContentHeader from "../../../components/molecules/contents/content-header";
import React from "react";
import Tablelayout from "../../../components/organisms/guide-layout/table-layout";
import { Typography } from "@mui/material";
import TableDataGrid from "../../../components/atoms/tables/table-data-grid";
import { useColorStore } from "../../../stores/useColor.store";

const Table = () => {
  const colors = useColorStore((state) => state.colors);

  return (
    <>
      <BoxTitleSeo title={"table"} />
      <Layout>
        <ContentHeader />
        <Typography sx={{ color: `var(--text-color)`, marginBottom: "20px", fontSize: "12px" }}>
          <strong style={{ margin: "5px 0 0 0", padding: "0", display: "block" }}>[체크박스 사용 방법]</strong>
          props 로 보낼 cols, cell 부분에 padding:&quot;checkbox&quot; 속성 삽입. | 예) title1
          <strong style={{ margin: "5px 0 0 0", padding: "0", display: "block" }}>[column 행 나누기]</strong>
          props 로 보낼 cols 에 row 속성 기본을 2 로 한다.
          <br />
          나눌 행의 col 속성 2 row 속성을 1로 한다. <br />
          subCols 행에 추가할 데이터를 넣는다. | 예) title4
          <strong style={{ margin: "5px 0 0 0", padding: "0", display: "block" }}>[rows 행 나누기]</strong>
          props 로 보낼 cols 에 col 속성을 2로 한다. | 예) title3
        </Typography>

        <Tablelayout />

        <hr className={"hr"} />

        <TableDataGrid />
      </Layout>
    </>
  );
};

export default Table;

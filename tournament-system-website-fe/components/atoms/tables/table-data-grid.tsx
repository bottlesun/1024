import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import { Box } from "@mui/material";
import FormCaptionView from "../forms/form-caption.view";
import { css } from "@emotion/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { dataGridStyle } from "../../../styles/layout";


const TableDataGrid = ({ ...props }) => {

  const { rowReordering, getCellClassName, onSelectionModelChange } = props;

  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World", col3: "hi", col4: "hello", col5: "word", col6: "ids" },
    { id: 2, col1: "Hello", col2: "World", col3: "hi", col4: "hello", col5: "word", col6: "ids" },
    { id: 3, col1: "Hello", col2: "World", col3: "hi", col4: "hello", col5: "word", col6: "ids" },
    { id: 4, col1: "Hello", col2: "World", col3: "hi", col4: "hello", col5: "word", col6: "ids" },
    { id: 5, col1: "Hello", col2: "World", col3: "hi", col4: "hello", col5: "word", col6: "ids" },
    { id: 6, col1: "Hello", col2: "World", col3: "hi", col4: "hello", col5: "word", col6: "ids" },
    { id: 7, col1: "Hello", col2: "World", col3: "hi", col4: "hello", col5: "word", col6: "ids" },
    { id: 8, col1: "Hello", col2: "World", col3: "hi", col4: "hello", col5: "word", col6: "ids" },
    { id: 9, col1: "Hello", col2: "World", col3: "hi", col4: "hello", col5: "word", col6: "ids" }
  ];

  const columns: GridColDef[] = [
    { field: "col1", headerName: "Column 1", flex: 1, headerAlign: "center", align: "center", colSpan: 1 },
    { field: "col2", headerName: "Column 2", flex: 1, headerAlign: "center", align: "center", colSpan: 1 },
    { field: "col3", headerName: "Column 3", flex: 1, headerAlign: "center", align: "center", colSpan: 1 },
    { field: "col4", headerName: "Column 4", flex: 1, headerAlign: "center", align: "center", colSpan: 1 },
    {
      field: "col5", headerName: "Column 5", flex: 1, headerAlign: "center", align: "center", colSpan: 1
    }
  ];

  const boxStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `;

  return (
    <Box css={dataGridStyle}>
      <Scrollbars
        autoHide
        universal
        autoHideTimeout={1000}
        autoHideDuration={300}
        autoHeight
        autoHeightMax={500}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={60}
          autoHeight={true}
          checkboxSelection={!rowReordering}
          disableColumnMenu={true}
          disableColumnFilter={true}
          hideFooter={true}
          components={{
            NoRowsOverlay: (): JSX.Element => <Box css={boxStyle}><FormCaptionView text={"검색 결과가 없습니다."} /></Box>,
            NoResultsOverlay: (): JSX.Element => <Box css={boxStyle}><FormCaptionView text={"검색 결과가 없습니다."} /></Box>
          }}
        />
      </Scrollbars>
    </Box>
  );
};

export default TableDataGrid;

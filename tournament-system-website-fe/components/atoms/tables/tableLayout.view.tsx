import React from "react";
import TableContainer from "@mui/material/TableContainer";
import { Scrollbars } from "react-custom-scrollbars-2";
import Table from "@mui/material/Table";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import { tableStyles } from "../../../styles/layout";
import { TemplateTableHeadTypes } from "../../molecules/template/list/template-table-list";

export type TableLayoutProps = {
  cols: TemplateTableHeadTypes[];
  rows: any[];
  onChecked?: SwitchBaseProps["onChange"];
  onSelectAllChecked?: SwitchBaseProps["onChange"];
  checkItems?: string[];
  autoHeightMax: number;
  tableWidth?: number | string;
  tableMaxWidth?: number | string;
  tableMinWidth?: number | string;
  children?: React.ReactNode;
  topTitle?: {
    title: string;
    text: string;
    onClick: () => void;
  };
  itemList?: any[];
};

const TableLayoutView = ({ ...props }: TableLayoutProps) => {
  return (
    <TableContainer sx={{ width: props.tableWidth }} css={tableStyles}>
      <Scrollbars autoHide universal autoHideTimeout={1000} autoHideDuration={300} autoHeight autoHeightMax={props.autoHeightMax} css={{ paddingBottom: 10 }}>
        <Table aria-label="caption table sticky" stickyHeader sx={{ minWidth: props.tableMinWidth + "!important", maxWidth: props.tableMaxWidth + "!important" }}>
          {props.children}
        </Table>
      </Scrollbars>
    </TableContainer>
  );
};
export default TableLayoutView;

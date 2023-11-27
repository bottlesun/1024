import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { css } from "@emotion/react";

export type TableCellProps = {
  value: number | string | React.ReactNode;
  maxNumber?: number;
  bg?: boolean;
  onClick?: () => void;
};

export const TableBorder = css`
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  height: 30px;
`;
const TableBattleSummaryRowCellView = ({ ...props }: TableCellProps) => {
  const styles = css`
    background: var(--opacity-color);
  `;

  return (
    <TableRow css={props.bg && styles}>
      <TableCell css={TableBorder} align={"center"}>
        {!props.maxNumber ? props.value : props.value + ` / ${props.maxNumber}`}
      </TableCell>
    </TableRow>
  );
};

export default TableBattleSummaryRowCellView;

import { TableCell } from "@mui/material";
import * as React from "react";
import { LinkProps } from "next/dist/client/link";
import ButtonTableLinkView from "../../button/button-table-link.view";

type TableLinkCellProps = {
  href: string;
  name: number | string | React.ReactNode;
  onClick: () => void;
} & LinkProps;

const TableBattleCellLinkView = ({ ...props }: TableLinkCellProps) => {
  return (
    <TableCell align={"center"} sx={{ padding: "0!important" }}>
      <ButtonTableLinkView {...props} />
    </TableCell>
  );
};
export default TableBattleCellLinkView;

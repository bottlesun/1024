import React from "react";
import TableLayoutView from "../../../atoms/tables/tableLayout.view";
import BoxTableTitleView from "../../../atoms/box/box-table-title.view";
import TableHeadView from "../../../atoms/tables/table-head.view";
import ButtonView from "../../../atoms/button/button.view";
import { Box } from "@mui/material";
import { TopBoxStyle } from "../../../../styles/layout";
import TableBattleSummaryInfoBodyView from "../../../atoms/tables/table-battle/table-battle-summary-info-body.view";

const BattleSummaryInformationView = ({ ...props }) => {
  return (
    <>
      <Box css={TopBoxStyle} sx={{ padding: "15px 0" }}>
        <BoxTableTitleView text={props?.topTitle?.title} />
        {props?.topTitle?.text && <ButtonView text={props?.topTitle?.text} onClick={props?.topTitle?.onClick} />}
      </Box>

      <TableLayoutView {...props.tableLayoutProps}>
        <TableHeadView {...props.tableLayoutProps} />
        <TableBattleSummaryInfoBodyView tableLayoutProps={props.tableLayoutProps} modalProps={props.modalProps} />
      </TableLayoutView>
    </>
  );
};
export default BattleSummaryInformationView;

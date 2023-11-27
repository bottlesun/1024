import { Box } from "@mui/material";
import { TopBoxStyle } from "../../../../styles/layout";
import BoxTableTitleView from "../../../atoms/box/box-table-title.view";
import TableLayoutView from "../../../atoms/tables/tableLayout.view";
import TableHeadView from "../../../atoms/tables/table-head.view";
import TableBattleDetailsRoomInfoBodyView from "../../../atoms/tables/table-battle/table-battle-details-room-info-body.view";
import React from "react";

const BattleDetailsRoomView = ({ ...props }) => {
  return (
    <>
      <Box css={TopBoxStyle}>
        {props.tableLayoutProps.id}
        <BoxTableTitleView {...props.tableLayoutTopProps} />
      </Box>

      <TableLayoutView {...props.tableLayoutProps}>
        <TableHeadView {...props.tableLayoutProps} />
        <TableBattleDetailsRoomInfoBodyView {...props.tableLayoutProps} />
      </TableLayoutView>
    </>
  );
};

export default BattleDetailsRoomView;

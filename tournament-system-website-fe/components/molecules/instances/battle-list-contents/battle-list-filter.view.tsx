import React from "react";
import { Box, Stack } from "@mui/material";
import DatePickerGroupView from "../../../atoms/forms/datePicker-group.view";
import InputGroupView from "../../../atoms/forms/input-group.view";
import SelectGroupView from "../../../atoms/forms/select-group.view";
import ButtonGroupView from "../../../atoms/button/button-group.view";
import { css } from "@emotion/react";

const contentLayoutStyle = css`
  width: 100%;
  border: 1px solid;
  max-width: 100%;
  padding: 20px;
  border-radius: 5px;
`;

const selectGroupStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 20px;

  select {
    width: 200px;
  }
  .MuiInputBase-root {
    width: 250px;
  }
  .MuiFormControl-root {
    flex-basis: 400px;
  }
`;

const BattleListFilterView = ({ ...props }) => {
  return (
    <>
      <Stack css={contentLayoutStyle} direction="column">
        <DatePickerGroupView {...props.DateGroup} />
        <Box css={selectGroupStyle}>
          <InputGroupView {...props.inputUserIdSearch} />
          <InputGroupView {...props.inputTournamentIdSearch} />
          <InputGroupView {...props.inputTournamentItemSearch} />
        </Box>
        <Box css={selectGroupStyle}>
          <SelectGroupView {...props.tournamentSelectItem} />
          <SelectGroupView {...props.stageSelectItem} />
          <SelectGroupView {...props.roomSelectItem} />
        </Box>
        <ButtonGroupView {...props.buttonGroups} />
      </Stack>
    </>
  );
};

export default BattleListFilterView;

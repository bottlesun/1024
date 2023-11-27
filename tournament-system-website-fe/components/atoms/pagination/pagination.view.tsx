import React from "react";
import { Box, Pagination } from "@mui/material";
import { css } from "@emotion/react";

const PaginationView = ({ ...props }) => {
  const paginationStyle = css`
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `;
  return (
    <Box css={paginationStyle}>
      <Pagination {...props} variant={"outlined"} shape={"rounded"} />
    </Box>
  );
};

export default PaginationView;

import { css } from "@emotion/react";
import { Theme as MaterialUITheme } from "@mui/material/styles/createTheme";

export const layout = (theme: MaterialUITheme) => {
  return css`
    .inner {
      padding: 0 20px 60px;
      min-width: var(--layout-min-width);
      max-width: var(--layout-max-width);
      &:hover {
        border-radius: 0;
      }
    }

    .Mui-focused {
      color: ${theme.palette.text.primary}!important;
    }
    .MuiSvgIcon {
      vertical-align: middle;
    }
    .MuiButton-text {
      :hover {
        background: ${theme.palette.primary.main};
      }
    }
    ,
    .reverse {
      background: ${theme.palette.background.default};
      :hover {
        background-color: ${theme.palette.primary.main};
      }
    }
  `;
};
/*폼그룹 공통*/
export const formWrap = css`
  padding: 5px;
  width: 100%;
  .formTitle {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .formBody {
    flex: 1;
    .MuiFormLabel-root {
      color: var(--text-color);
    }
  }
`;

export const formLabel = css`
  height: 100%;
  min-height: 50px;
  min-width: 100px;

  h3 {
    padding: 15px 20px 15px 8px;
    max-height: 50px;
    margin: 0;
    font-weight: 500;
    .point {
      margin-left: 5px;
      color: #d32f2f;
    }
  }
`;

export const tableStyles = css`
  border-radius: 0;
  box-shadow: none;
  max-width: var(--layout-max-width);
  overflow-x: scroll;
  div::-webkit-scrollbar {
    height: 0;
  }
  table {
    max-width: var(--layout-max-width);
    min-width: 1600px;
    width: 100%;
  }
  thead {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
  }
  tr {
    width: 100%;
  }

  th {
    padding: 2px 5px;
    border-left: none;

    &.checkbox {
      min-width: 50px;
    }
  }

  td {
    padding: 5px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  td:has(.MuiButtonBase-root:disabled) {
    background: var(--opacity-color);
    button {
      color: var(--disabled-color);
    }
  }
`;

export const dataGridStyle = (theme: MaterialUITheme) => {
  return css`
    max-width: var(--layout-max-width);
    min-width: 650px;
    .MuiDataGrid-root {
      border-left: none;
      border-right: none;
      border-top: none;
    }
    .MuiDataGrid-columnHeaders {
      color: ${theme.palette.text.primary};
      background: ${theme.palette.primary.main};
    }
    .MuiDataGrid-virtualScrollerContent {
      color: ${theme.palette.text.primary};
      background: var(--opacity-color);
    }
    .MuiDataGrid-cell {
      border: var(--border-line);
    }
    .MuiDataGrid-iconButtonContainer {
      display: none;
    }
  `;
};

export const VerticalMenu = (theme: MaterialUITheme) => {
  return css`
    padding: 20px;
    max-height: 70px;
    border-top: var(--border-line);
    display: flex;
    width: 100%;
    align-items: center;
    gap: 20px;
    font-size: 14px;
    z-index: 999;

    ul li ul {
      visibility: hidden;
      position: absolute;
    }
  `;
};

export const TopBoxStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

import { css, Theme } from "@emotion/react";
import { Theme as MaterialUITheme } from "@mui/material/styles";

declare module "@emotion/react" {
  export interface Theme extends MaterialUITheme {}
}
const global = (theme: Theme) => {
  return css`
    :root {
      --box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
      --layout-min-width: 1500px;
      --layout-max-width: 2200px;
      --drawer-width: 240px;
      --drawer-height: 100px;
      --border-line: 1px solid ${theme.palette.primary.main === "#dee2e6" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"};
      --opacity-color: ${theme.palette.primary.main === "#dee2e6" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)"};
      --bg-color: ${theme.palette.background.paper};
      --hover-color: ${theme.palette.action.hover};
      --active-color: ${theme.palette.action.active};
      --text-color: ${theme.palette.text.primary};
      --disabled-color: ${theme.palette.primary.main === "#dee2e6" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"};
    }

    .hr {
      margin: 20px 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Noto Sans KR", sans-serif;
      color: ${theme.palette.text.primary};
      font-weight: 300;

      &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #999;
        border-radius: 5px;
      }
    }

    html,
    body,
    #__next {
      width: 100%;
      background: ${theme.palette.background.default};
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      font-weight: bold;
      margin: 0;
      padding: 0;
    }

    ul,
    li {
      list-style: none;
    }

    a {
      text-decoration: none;
    }

    #__next {
      min-width: calc(var(--layout-min-width) + var(--drawer-width));
    }

    html {
      font-size: 16px;
    }

    .Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${theme.palette.text.primary}!important;
    }
    .MuiToolbar-root {
      padding: 0 !important;
    }

    .scrollbar {
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .date-picker-point .MuiBadge-badge {
      color: var(--disabled-color);
    }

    .done-table {
      background: var(--active-color) !important;
    }
  `;
};
export default global;

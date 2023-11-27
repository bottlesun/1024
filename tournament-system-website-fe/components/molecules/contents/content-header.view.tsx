import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { css } from "@emotion/react";
import { breadcrumbsType } from "./content-header";

type ContentHeaderViewProps = {
  breadcrumbs: breadcrumbsType[];
};
const ContentHeaderView = ({ breadcrumbs }: ContentHeaderViewProps) => {
  const contentHeaderStyle = css`
    display: flex;
    justify-content: space-between;
    height: 40px;
    backdrop-filter: blur(10px);
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.05);
    align-items: center;
    padding: 0 20px;
    border-radius: 5px;
    margin: 10px 0 20px;

    h2 {
      font-size: 15px;
      font-weight: bold;
    }

    .breadcrumbs {
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        display: block;
        font-size: 13px;
        text-decoration: none;
      }

      svg {
        width: 20px;
      }

      span {
        font-size: 13px;
      }
    }
  `;

  return (
    <Box component={"article"} css={contentHeaderStyle}>
      <Typography component={"h2"}>{breadcrumbs[breadcrumbs.length - 1].text}</Typography>

      <Breadcrumbs className={"breadcrumbs"} aria-label="breadcrumb" separator="›">
        <Link color="inherit" href="/">
          <HomeIcon />
        </Link>
        {breadcrumbs?.map((link, num) => {
          return (
            <Link key={num} color="inherit" href={link?.href}>
              {link?.text}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default ContentHeaderView;

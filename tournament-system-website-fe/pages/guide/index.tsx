import BoxTitleSeo from "../../components/atoms/box/box-title-seo";
import Layout from "../../components/organisms/layout/layout";
import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { useColorStore } from "../../stores/useColor.store";
import { Dark, Light } from "../../constants/theme";
import { NextPage } from "next";

const styles = {
  wrap: {
    padding: "10px",
    "& li": {
      display: "flex",
      gap: "10px",
      a: {
        color: `rgba(255,255,255,0.5)`,
        "&:hover": {
          color: "rgba(255,255,255,1)"
        }
      }
    }
  }
};

const Index: NextPage<any> = ({ path, body }: any): JSX.Element => {
  const colors = useColorStore((state) => state.colors);

  return (
    <>
      <BoxTitleSeo title={"table"} />
      <Layout>
        <Typography sx={{ fontSize: "15px", color: `${colors ? Dark.text : Light.text}` }}>[가이드]</Typography>
        <List sx={styles.wrap}>
          <ListItem>
            <Link href={"/guide/tables"}>table</Link>
            <Link href={"/guide/forms"}>forms</Link>
          </ListItem>
        </List>
      </Layout>
    </>
  );
};

export default Index;

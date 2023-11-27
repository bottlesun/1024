import BoxTitleSeo from "../../../components/atoms/box/box-title-seo";
import Layout from "../../../components/organisms/layout/layout";
import ContentHeader from "../../../components/molecules/contents/content-header";
import React from "react";
import FormsLayout from "../../../components/organisms/guide-layout/forms-layout";
import { useTheme } from "@mui/material";

const Forms = () => {
  const theme = useTheme();

  //console.log('theme',theme)
  return (
    <>
      <BoxTitleSeo title={"forms"} />
      <Layout>
        <ContentHeader />
        <FormsLayout />
      </Layout>
    </>
  );
};
export default Forms;

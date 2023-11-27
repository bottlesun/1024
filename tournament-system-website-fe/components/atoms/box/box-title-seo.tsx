import Head from "next/head";
import React from "react";

const BoxTitleSeo = ({ title }: { title: React.ReactNode }) => {
  // seo title page
  return (
    <Head>
      <title key={"title"}>{title} | 토너먼트 시스템</title>
    </Head>
  );
};
export default BoxTitleSeo;

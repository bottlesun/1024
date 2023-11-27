import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import BoxTitleSeo from "../../../components/atoms/box/box-title-seo";
import Layout from "../../../components/organisms/layout/layout";
import InstancesCreate from "../../../components/organisms/instances/create/instances-create";
import { Cookies } from "react-cookie";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = new Cookies(context.req.headers.cookie);
  const token = cookies.get("access-token");

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }

  return {
    props: {
      token: token ? token : undefined
    }
  };
};

const Index: NextPage<any> = ({ token }: { token: string }): JSX.Element => {
  return (
    <>
      <BoxTitleSeo title={"인스턴스 생성"} />
      <Layout>
        {/*<List sx={styles.wrap}></List>*/}
        <InstancesCreate token={token} />
      </Layout>
    </>
  );
};

export default Index;

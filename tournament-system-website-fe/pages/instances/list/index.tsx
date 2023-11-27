import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import BoxTitleSeo from "../../../components/atoms/box/box-title-seo";
import Layout from "../../../components/organisms/layout/layout";
import InstancesList from "../../../components/organisms/instances/list/instances-list";
import { InstanceAPI } from "../../../apis/v1/instance.api";
import { Cookies } from "react-cookie";
import { PostDataTypes } from "../../../apis/types/instance.api.type";

type instancesProps = {
  body: {
    instancesListData: PostDataTypes[];
  };
  path: string;
  token: string;
  status: number;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = new Cookies(context.req.headers.cookie);
  const token = cookies.get("access-token");

  const client = new InstanceAPI(true, token);

  const query = context.query;
  const limit = Number(query.limit === undefined ? 9 : query.limit);
  const page = Number(query.page === undefined ? 1 : query.page);
  const filter = query.filter === undefined ? undefined : String(query.filter);
  const is_done = query.is_done === "true";

  const result = await client.postFindInstance({
    params: {
      offset: limit * (page - 1),
      limit: limit
    },
    body: {
      filter: {
        schedule_name: filter,
        is_done: is_done
      },
      sort: {
        created_at: -1
      }
    }
  });

  if (result?.status === 401) {
    return {
      redirect: {
        destination: "/manager/login",
        permanent: false
      }
    };
  }

  return {
    props: {
      token: token,
      status: result?.status,
      body: {
        instancesListData: result?.status !== 201 ? [] : result?.data.data,
        limit: limit,
        page: page,
        total: result?.status !== 201 ? 0 : Number(result?.data.meta.total_count)
      }
    }
  };
};

const Index: NextPage<any> = ({ path, body, token, status }: instancesProps): JSX.Element => {
  return (
    <>
      <BoxTitleSeo title={"인스턴트 리스트"} />
      <Layout>
        <InstancesList body={body} token={token} />
      </Layout>
    </>
  );
};

export default Index;

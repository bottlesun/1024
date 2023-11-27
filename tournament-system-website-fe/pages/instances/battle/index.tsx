import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import BoxTitleSeo from "../../../components/atoms/box/box-title-seo";
import Layout from "../../../components/organisms/layout/layout";
import BattleList from "../../../components/organisms/instances/battle-list/battle-list";
import { Cookies } from "react-cookie";
import { MatchAPI } from "../../../apis/v1/match.api";
import dayjs from "dayjs";
import { PostDataTypes } from "../../../apis/types/instance.api.type";
import { MatchV1PhaseFindResDto, MatchV1ProgressDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.res.dto";

export type BattleListProps = {
  body: {
    matchProgressData: MatchV1ProgressDataRes[];
    matchListData: MatchV1PhaseFindResDto;
    instanceListData: PostDataTypes[];
  };
  token: string;
  status: number;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = new Cookies(context.req.headers.cookie);
  const token = cookies.get("access-token");

  const matchClient = new MatchAPI(true, token);

  const query = context.query;
  const limit = Number(query.limit === undefined ? 5 : query.limit);
  const page = Number(query.page === undefined ? 1 : query.page);
  const userId = query.userID ? String(query.userID) : undefined;
  const id = query.id !== "all" ? query.id : undefined;
  const idFilter = id === undefined ? {} : { id: Number(id) };
  const start_at = query.started_at ? String(query.started_at) : dayjs().add(-7, "day").format("YYYY-MM-DD");
  const end_at = query.ended_at ? String(query.ended_at) : dayjs().format("YYYY-MM-DD");
  const schedule_name = query.schedule_name ? String(query.schedule_name) : undefined;
  const is_done = query.is_done === "true";

  const matchProgressList = await matchClient.postFindMatchProgress();

  const matchResultList = await matchClient.postFindMatch({
    // 배틀 리스트
    params: {
      offset: limit * (page - 1),
      limit: limit
    },
    body: {
      filter: {
        ...idFilter,
        user_id: userId,
        start_at: start_at ? undefined : start_at,
        end_at: end_at,
        schedule_name: schedule_name,
        is_done: is_done
      }
    }
  });
  if (matchResultList?.status === 401) {
    return {
      redirect: {
        // 401이면 로그인 페이지로 리다이렉트
        destination: "/manager/login",
        permanent: false
      }
    };
  }

  return {
    props: {
      token: token,
      status: matchResultList?.status,
      body: {
        matchListData: matchResultList?.status !== 201 ? [] : matchResultList?.data,
        matchProgressData: matchProgressList?.status !== 201 ? [] : matchProgressList.data,
        limit: limit,
        page: Number(page),
        total: matchResultList?.status !== 201 ? 0 : Number(matchResultList?.data.meta.total_count)
      }
    }
  };
};

const Index: NextPage<any> = ({ body, token, status }: BattleListProps): JSX.Element => {
  return (
    <>
      <BoxTitleSeo title={"대전 리스트"} />W
      <Layout>
        <BattleList body={body} token={token} />
      </Layout>
    </>
  );
};

export default Index;

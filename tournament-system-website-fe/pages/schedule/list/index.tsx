import Layout from "../../../components/organisms/layout/layout";
import BoxTitleSeo from "../../../components/atoms/box/box-title-seo";
import ScheduleList from "../../../components/organisms/schedule/list/schedule-list";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { ScheduleAPI } from "../../../apis/v1/schedule.api";
import { Cookies } from "react-cookie";
import { ManagerAPI } from "../../../apis/v1/manager.api";
import { ScheduleV1FindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/schedule-v1/schedule-v1.res.dto";

type scheduleProps = {
  body: {
    scheduleListData: ScheduleV1FindDataRes[];
  };
  path: string;

  token: string;
  status: number;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = new Cookies(context.req.headers.cookie);
  const token = cookies.get("access-token");

  const client = new ScheduleAPI(true, token);
  const loginClient = new ManagerAPI(true);

  const query = context.query;
  const limit = Number(query.limit === undefined ? 9 : query.limit);
  const page = Number(query.page === undefined ? 1 : query.page);
  const filter = query.filter === undefined ? undefined : String(query.filter);
  const is_done = query.is_done === "true";

  const result = await client.postFindSchedule({
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
        // 401이면 로그인 페이지로 리다이렉트
        destination: "/manager/login",
        permanent: false
      }
    };
  }

  return {
    props: {
      token: token ? token : undefined,
      status: result?.status,
      body: {
        scheduleListData: result?.status !== 201 ? [] : result?.data.data,
        limit: limit,
        page: page,
        total: result?.status !== 201 ? 0 : Number(result?.data.meta.total_count)
      }
    }
  };
};

const Index: NextPage<any> = ({ path, body, token, status }: scheduleProps): JSX.Element => {
  return (
    <Layout>
      <BoxTitleSeo title={"스케줄리스트"} />
      <ScheduleList body={body} token={token} />
    </Layout>
  );
};
export default Index;

import Layout from "../../../components/organisms/layout/layout";
import BoxTitleSeo from "../../../components/atoms/box/box-title-seo";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { TemplateAPI } from "../../../apis/v1/template.api";
import TemplateList from "../../../components/organisms/template/list/template-list";
import { Cookies } from "react-cookie";
import { TemplateV1FindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.res.dto";

type templateProps = {
  body: {
    templateListData: TemplateV1FindDataRes[];
  };
  path: string;
  token: string;
  status: number;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = new Cookies(context.req.headers.cookie);
  const token = cookies.get("access-token");

  const client = new TemplateAPI(true, token);

  const query = context.query;
  const limit = Number(query.limit === undefined ? 9 : query.limit);
  const page = Number(query.page === undefined ? 1 : query.page);
  const filter = query.filter === undefined ? undefined : String(query.filter);

  const result = await client.postFindTemplate({
    params: {
      offset: limit * (page - 1),
      limit: limit
    },
    body: {
      filter: {
        template_name: filter
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
      token: token,
      status: result.status,
      body: {
        templateListData: result.status !== 201 ? [] : result?.data.data,
        limit: limit,
        page: page,
        total: result?.status !== 201 ? 0 : Number(result?.data.meta.total_count)
      }
    }
  };
};

const Index: NextPage<any> = ({ path, body, token, status }: templateProps): JSX.Element => {
  return (
    <Layout>
      <BoxTitleSeo title={"템플릿리스트"} />
      <TemplateList body={body} token={token} />
    </Layout>
  );
};
export default Index;

import Layout from "../../../components/organisms/layout/layout";
import TemplateCreateList from "../../../components/organisms/template/create/template-create-list";
import BoxTitleSeo from "../../../components/atoms/box/box-title-seo";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
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
      token: token
    }
  };
};
const Index: NextPage<any> = ({ token }: { token: string }): JSX.Element => {
  return (
    <Layout>
      <BoxTitleSeo title={"템플릿생성"} />
      <TemplateCreateList token={token} />
    </Layout>
  );
};
export default Index;

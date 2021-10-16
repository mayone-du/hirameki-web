import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useGetMyAllPostsLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

const DashboradIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const [query, { data }] = useGetMyAllPostsLazyQuery();

  useEffect(() => {
    userInfo.isLogin && query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.isLogin]);

  return (
    <>
      <NextSeo title="ダッシュボード" noindex />

      <div>
        {data?.myAllIdeas?.edges.length === 0 && <div>アイデアはまだありません</div>}
        {data?.myAllIdeas?.edges.map((idea, index) => {
          return <div key={index.toString()}>{idea?.node?.title}</div>;
        })}
      </div>
    </>
  );
};

export default DashboradIndexPage;

DashboradIndexPage.getLayout = Layout;

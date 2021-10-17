import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import Link from "next/link";
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
        <div>
          <div>Idea</div>
          {data?.myAllIdeas?.edges.length === 0 && <div>アイデアはまだありません</div>}
          {data?.myAllIdeas?.edges.map((idea) => {
            return (
              <div key={idea?.node?.id}>
                <Link href={`/ideas/${idea?.node?.id}`}>
                  <a className="block bg-blue-300">{idea?.node?.title}</a>
                </Link>
              </div>
            );
          })}
        </div>

        <div>
          <div>Memo</div>
          {data?.myAllMemos?.edges.length === 0 && <div>メモはまだありません</div>}
          {data?.myAllMemos?.edges.map((memo) => {
            return (
              <div key={memo?.node?.id}>
                <Link href={`/memos/${memo?.node?.id}`}>
                  <a className="block bg-blue-300">{memo?.node?.title}</a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DashboradIndexPage;

DashboradIndexPage.getLayout = Layout;

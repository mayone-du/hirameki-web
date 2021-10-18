import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useGetMyAllLikesLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

const DashboardLikeIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const [query, { data }] = useGetMyAllLikesLazyQuery();

  useEffect(() => {
    userInfo.isLogin && query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.isLogin]);

  return (
    <>
      <NextSeo title="いいねした投稿一覧" noindex />

      <div>
        <div>
          <div>Idea</div>
          {data?.myLikeIdeas?.edges.length === 0 && <div>いいねしたアイデアはまだありません</div>}
          {data?.myLikeIdeas?.edges.map((like) => {
            return (
              <div key={like?.node?.id}>
                <Link href={`/ideas/${like?.node?.likedIdea?.id}`}>
                  <a className="block bg-blue-300">{like?.node?.likedIdea?.title}</a>
                </Link>
              </div>
            );
          })}
        </div>

        <div>
          <div>Memo</div>
          {data?.myLikeMemos?.edges.length === 0 && <div>いいねしたメモはまだありません</div>}
          {data?.myLikeMemos?.edges.map((like) => {
            return (
              <div key={like?.node?.id}>
                <Link href={`/memos/${like?.node?.likedMemo?.id}`}>
                  <a className="block bg-blue-300">{like?.node?.likedMemo?.title}</a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DashboardLikeIndexPage;

DashboardLikeIndexPage.getLayout = Layout;

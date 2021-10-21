import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useGetIdeaLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

// IdeaEditorがSSR出来ないため、dynamic importにする
const IdeaEditor = dynamic(
  async () => {
    const module = await import("src/pages/ideas/components/IdeaEditor");
    return module.IdeaEditor;
  },
  {
    ssr: false,
    loading: () => {
      return <div>Editor Loading...</div>;
    },
  },
);

// アイデアの編集ページ
const IdeaEditIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const router = useRouter();
  const ideaId = router.asPath.replace("/ideas/", "").replace("/edit/", "");
  const [query, { data }] = useGetIdeaLazyQuery();

  useEffect(() => {
    userInfo.isLogin &&
      ideaId &&
      query({
        variables: {
          id: ideaId,
        },
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.isLogin, userInfo.userId, ideaId]);

  return (
    <>
      <NextSeo title="アイデアの作成" noindex />
      {!userInfo.isLoading && userInfo.isLogin && data?.idea?.ideaCreator.id === userInfo.userId && (
        <div>
          <h1>アイデアの編集</h1>
          <IdeaEditor
            title={data.idea.title}
            isPublished={data.idea.isPublished}
            markdown={data.idea.content}
            topicIds={data.idea.topics.edges.map((topic) => {
              return topic?.node?.id ?? "";
            })}
            ideaId={ideaId}
          />
        </div>
      )}

      {!userInfo.isLoading &&
        userInfo.isLogin &&
        data?.idea &&
        data.idea.ideaCreator.id !== userInfo.userId && <div>404 他の人の記事です</div>}

      {!userInfo.isLoading && !userInfo.isLogin && <div>ログインが必要です。</div>}
    </>
  );
};

export default IdeaEditIndexPage;

IdeaEditIndexPage.getLayout = Layout;

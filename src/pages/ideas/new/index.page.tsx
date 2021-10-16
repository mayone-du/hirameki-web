import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import { userInfoVar } from "src/graphql/apollo/cache";
import { Layout } from "src/layouts";

// IdeaEditorがSSR出来ないため、dynamic importにする
const IdeaEditor = dynamic(
  async () => {
    const module = await import("src/pages/ideas/new/components/IdeaEditor");
    return module.IdeaEditor;
  },
  {
    ssr: false,
    loading: () => {
      return <div>Editor Loading...</div>;
    },
  },
);
const IdeaNewIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);

  return (
    <>
      <NextSeo title="アイデアの作成" noindex />

      {!userInfo.isLoading && userInfo.isLogin && (
        <div className="flex">
          <div className="md:w-3/5">
            <h1>アイデアの作成</h1>
            <IdeaEditor />
          </div>

          <aside className="md:w-2/5">
            <button className="block p-2 bg-blue-100 border">保存</button>
          </aside>
        </div>
      )}

      {!userInfo.isLoading && !userInfo.isLogin && <div>ログインが必要です。</div>}
    </>
  );
};

export default IdeaNewIndexPage;

IdeaNewIndexPage.getLayout = Layout;

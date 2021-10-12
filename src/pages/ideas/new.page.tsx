import type { CustomNextPage } from "next";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
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
      return <div>aaaaaaaaaaaaaa</div>;
    },
  },
);
const IdeaNewIndexPage: CustomNextPage = () => {
  return (
    <>
      <NextSeo title="アイデアの作成" noindex />

      <div>
        <h1>アイデアの作成</h1>
        <IdeaEditor />
      </div>
    </>
  );
};

export default IdeaNewIndexPage;

IdeaNewIndexPage.getLayout = Layout;

import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "src/layouts";
import { IdeaEditor } from "src/pages/ideas/components/IdeaEditor";

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

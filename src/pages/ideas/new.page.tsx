import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "src/layouts";

const IdeaNewIndexPage: CustomNextPage = () => {
  return (
    <>
      <NextSeo title="アイデアの作成" noindex />

      <div>
        <h1>アイデアの作成</h1>
      </div>
    </>
  );
};

export default IdeaNewIndexPage;

IdeaNewIndexPage.getLayout = Layout;

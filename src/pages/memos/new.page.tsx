import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "src/layouts";

const MemoNewIndexPage: CustomNextPage = () => {
  return (
    <>
      <NextSeo title="メモの作成" noindex />

      <div>
        <h1>メモの作成</h1>
        <input type="text" className="block p-2 border" placeholder="メモ" />
      </div>
    </>
  );
};

export default MemoNewIndexPage;

MemoNewIndexPage.getLayout = Layout;

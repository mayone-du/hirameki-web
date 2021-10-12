import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "src/layouts";

const SearchIndexPage: CustomNextPage = () => {
  return (
    <>
      <NextSeo title="検索" />

      <div>
        <h1>アイデアやメモ、ユーザーを検索</h1>
        <input type="search" className="block p-2 border" placeholder="Search" />
      </div>
    </>
  );
};

export default SearchIndexPage;

SearchIndexPage.getLayout = Layout;

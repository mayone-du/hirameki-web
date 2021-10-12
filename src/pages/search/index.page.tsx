import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { Layout } from "src/layouts";

const SearchIndexPage: CustomNextPage = () => {
  return (
    <>
      <NextSeo title="検索" />

      <div>検索</div>
    </>
  );
};

export default SearchIndexPage;

SearchIndexPage.getLayout = Layout;

import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchItemsLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

type SearchInput = {
  keyword: string;
};

const SearchIndexPage: CustomNextPage = () => {
  const { register, handleSubmit } = useForm<SearchInput>();
  const router = useRouter();
  const [query, { data }] = useSearchItemsLazyQuery();

  useEffect(() => {
    router.query.keyword && query({ variables: { keyword: router.query.keyword.toString() } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.keyword]);

  const handleSearch = async (formData: SearchInput) => {
    router.push({
      pathname: "/search",
      query: { keyword: formData.keyword },
    });
  };

  return (
    <>
      <NextSeo title="検索" />

      <div>
        <h1>アイデアやメモ、ユーザーを検索</h1>
        <form onSubmit={handleSubmit(handleSearch)}>
          <input
            type="search"
            className="block p-2 border"
            placeholder="Search"
            {...register("keyword")}
          />
        </form>

        <div className="flex justify-around">
          <div>
            idea
            {data?.allIdeas?.edges.map((idea, index) => {
              return <div key={index.toString()}>{idea?.node?.title}</div>;
            })}
          </div>

          <div>
            memo
            {data?.allMemos?.edges.map((memo, index) => {
              return <div key={index.toString()}>{memo?.node?.title}</div>;
            })}
          </div>

          <div>
            profiles
            {data?.allProfiles?.edges.map((profile, index) => {
              return <div key={index.toString()}>{profile?.node?.profileName}</div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchIndexPage;

SearchIndexPage.getLayout = Layout;

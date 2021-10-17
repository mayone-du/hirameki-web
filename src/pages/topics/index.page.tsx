import type { CustomNextPage, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { initializeApollo } from "src/graphql/apollo/client";
import type { GetAllTopicsQuery } from "src/graphql/schemas/schema";
import { GetAllTopicsDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null, undefined);
  const { data } = await apolloClient.query<GetAllTopicsQuery>({ query: GetAllTopicsDocument });
  return { props: data };
};
const TopicsIndexPage: CustomNextPage<GetAllTopicsQuery | undefined> = (props) => {
  return (
    <>
      <NextSeo title="トピック一覧" />

      <div>
        <h1 className="py-4 text-2xl font-bold text-center">トピック一覧</h1>
        {props.allTopics?.edges.map((topic) => {
          return <div key={topic?.node?.name}>{topic?.node?.name}</div>;
        })}
      </div>
    </>
  );
};

export default TopicsIndexPage;

TopicsIndexPage.getLayout = Layout;

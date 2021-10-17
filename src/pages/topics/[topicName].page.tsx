import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { initializeApollo } from "src/graphql/apollo/client";
import type {
  GetAllTopicsQuery,
  GetTopicQuery,
  GetTopicQueryVariables,
} from "src/graphql/schemas/schema";
import { GetAllTopicsDocument, GetTopicDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo(null, undefined);
  const { data } = await apolloClient.query<GetAllTopicsQuery>({ query: GetAllTopicsDocument });
  const topicNames = data.allTopics
    ? data.allTopics.edges.map((topic) => {
        return {
          params: {
            topicName: topic?.node?.name ?? "",
          },
        };
      })
    : [];
  return { paths: topicNames, fallback: false };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const topicName = context.params?.topicName?.toString() ?? "";
  const apolloClient = initializeApollo(null, undefined);
  const { data } = await apolloClient.query<GetTopicQuery, GetTopicQueryVariables>({
    query: GetTopicDocument,
    variables: {
      topicName: topicName,
    },
  });

  return { props: data, revalidate: 60 };
};
const TopicsDetailPage: CustomNextPage<GetTopicQuery | undefined> = (props) => {
  return <div>{props.topic?.displayName}</div>;
};

export default TopicsDetailPage;

TopicsDetailPage.getLayout = Layout;

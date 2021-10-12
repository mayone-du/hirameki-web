import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { userInfoVar } from "src/graphql/apollo/cache";
import { initializeApollo } from "src/graphql/apollo/client";
import type {
  GetAllIdeasQuery,
  GetIdeaQuery,
  GetIdeaQueryVariables,
} from "src/graphql/schemas/schema";
import { GetAllIdeasDocument, GetIdeaDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

// 各アイデアのIDを取得
export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo(null, "");
  const { data } = await apolloClient.query<GetAllIdeasQuery>({ query: GetAllIdeasDocument });
  const ids = data.allIdeas
    ? data.allIdeas.edges.map((idea) => {
        if (idea?.node) {
          return {
            params: {
              ideaId: idea.node.id,
            },
          };
        } else {
          return { params: { ideaId: "" } };
        }
      })
    : [];
  return { paths: ids, fallback: false };
};

// 各アイデアのIDから詳細を取得
export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo(null, "");
  const ideaId = context.params?.ideaId;
  const { data } = await apolloClient.query<GetIdeaQuery, GetIdeaQueryVariables>({
    query: GetIdeaDocument,
    variables: {
      id: ideaId?.toString() ?? "",
    },
  });

  return { props: data, revalidate: 60 /* 60sec */ };
};

const UsersDetailPage: CustomNextPage<GetIdeaQuery | undefined> = (props) => {
  const userInfo = useReactiveVar(userInfoVar);

  return (
    <>
      <NextSeo title={props.idea?.title ?? "アイデア"} />

      <div>userinfo : {userInfo.isLogin}</div>

      <div>
        {props.idea?.id}
        <br />

        {props.idea?.title}
        <br />
        {props.idea?.content}
        <br />
        {props.idea?.createdAt}
      </div>
    </>
  );
};

export default UsersDetailPage;

UsersDetailPage.getLayout = Layout;

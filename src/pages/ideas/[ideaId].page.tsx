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

      <div className="flex">
        <article className="p-2 md:mr-4 md:w-2/3 rounded-xl border">
          <div>{props.idea?.ideaCreator.id === userInfo.userId && "自分のアイデアです"}</div>

          <h1 className="text-2xl font-bold text-center">{props.idea?.title}</h1>
          <p>{props.idea?.content}</p>
          <p className="text-sm text-gray-700">{props.idea?.createdAt}</p>
        </article>

        {/* サイドバー */}
        <aside className="p-2 md:ml-4 md:w-1/3 rounded-xl border">aside</aside>
      </div>
    </>
  );
};

export default UsersDetailPage;

UsersDetailPage.getLayout = Layout;

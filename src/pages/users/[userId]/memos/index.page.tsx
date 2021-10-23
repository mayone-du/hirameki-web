import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { initializeApollo } from "src/graphql/apollo/client";
import type {
  GetAllUsersQuery,
  GetUserMemosQuery,
  GetUserMemosQueryVariables,
} from "src/graphql/schemas/schema";
import { GetAllUsersDocument, GetUserMemosDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

// 各ユーザーのIDを取得
// TODO: 処理の共通化
export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo(null, "");
  const { data } = await apolloClient.query<GetAllUsersQuery>({ query: GetAllUsersDocument });
  const ids = data.allUsers
    ? data.allUsers.edges.map((user) => {
        if (user?.node) {
          return {
            params: {
              userId: user.node.id,
            },
          };
        } else {
          return { params: { userId: "" } };
        }
      })
    : [];
  return { paths: ids, fallback: false };
};

// 各ユーザーのIDから詳細を取得
export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo(null, "");
  const userId = context.params?.userId;
  const { data } = await apolloClient.query<GetUserMemosQuery, GetUserMemosQueryVariables>({
    query: GetUserMemosDocument,
    variables: {
      userId: userId?.toString() ?? "",
    },
  });

  return { props: data, revalidate: 5 /* 5sec */ };
};

const UsersDetailMemosIndexPage: CustomNextPage<GetUserMemosQuery | undefined> = (props) => {
  return (
    <>
      <NextSeo title="" />

      <div>
        <ul>
          {props.userMemos?.edges.map((memo) => {
            return <li key={memo?.node?.id}>{memo?.node?.title}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default UsersDetailMemosIndexPage;

UsersDetailMemosIndexPage.getLayout = Layout;

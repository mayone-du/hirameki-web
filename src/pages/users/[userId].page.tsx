import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { userInfoVar } from "src/graphql/apollo/cache";
import { initializeApollo } from "src/graphql/apollo/client";
import type {
  GetAllUsersQuery,
  GetUserQuery,
  GetUserQueryVariables,
} from "src/graphql/schemas/schema";
import { GetAllUsersDocument, GetUserDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
// import { DetailData } from "src/pages/users/components/DetailData";
// import { MyUserInfo } from "src/pages/users/components/MyUserInfo";

// 各ユーザーのIDを取得
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
  const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    query: GetUserDocument,
    variables: {
      id: userId?.toString() ?? "",
    },
  });

  return { props: data, revalidate: 60 /* 60sec */ };
};

const UsersDetailPage: CustomNextPage<GetUserQuery | undefined> = (props) => {
  const PAGE_NAME =
    (props.user?.relatedUser?.profileName || props.user?.username) + "のプロフィール";

  const userInfo = useReactiveVar(userInfoVar);

  return (
    <>
      <NextSeo title={PAGE_NAME} />

      <div>{props.user?.username}</div>
      <div>{userInfo.userId === props.user?.id && "自分です"}</div>
    </>
  );
};

export default UsersDetailPage;

UsersDetailPage.getLayout = Layout;

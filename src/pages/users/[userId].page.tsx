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
import { EditProfileButton, FollowButton } from "src/pages/users/components";

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

  return { props: data, revalidate: 5 /* 5sec */ };
};

// ユーザーの詳細ページ
const UsersDetailPage: CustomNextPage<GetUserQuery | undefined> = (props) => {
  const PAGE_NAME =
    (props.user?.relatedUser?.profileName || props.user?.username) + "のプロフィール";

  const userInfo = useReactiveVar(userInfoVar);

  return (
    <>
      <NextSeo title={PAGE_NAME} />

      <div>
        <section>
          <div className="flex">
            <img
              src={
                // プロフィール画像を設定していなければGoogleアカウントの画像を表示
                props.user?.relatedUser?.profileImage
                  ? props.user.relatedUser.profileImage
                  : props.user?.relatedUser?.googleImageUrl ?? ""
              }
              alt="Profile Icon"
              className="block object-cover overflow-hidden w-32 h-32 rounded-full"
            />
            <div>
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{props.user?.relatedUser?.profileName}</h1>
                {/* 自分のプロフィール化によってボタンを出し分け */}
                {!userInfo.isLoading && userInfo.userId === props.user?.id && <EditProfileButton />}
                {!userInfo.isLoading && userInfo.userId !== props.user?.id && (
                  <FollowButton pageUserId={props.user?.id ?? ""} />
                )}
              </div>
              <p>{props.user?.relatedUser?.selfIntroduction || "自己紹介はありません"}</p>

              {/* その他の情報 */}
              <div>
                <p>
                  <span className="text-lg font-bold">
                    {props.user?.followedUser.edges.length.toString()}
                  </span>{" "}
                  Followers
                </p>
                <p>
                  <span className="text-lg font-bold">
                    {props.user?.ideaCreator.edges.length.toString()}
                  </span>{" "}
                  Ideas
                </p>
              </div>
            </div>
          </div>
        </section>

        <div>
          フォロワー
          <br />
          {props.user?.followedUser.edges.map((follow, index) => {
            return (
              <div key={index.toString()}>
                {follow?.node?.followingUser.relatedUser?.profileName}
              </div>
            );
          })}
        </div>

        <div>
          フォローしているユーザー
          <br />
          {props.user?.followingUser.edges.map((follow, index) => {
            return (
              <div key={index.toString()}>
                {follow?.node?.followedUser.relatedUser?.profileName}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UsersDetailPage;

UsersDetailPage.getLayout = Layout;

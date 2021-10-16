import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { AiOutlineGithub, AiOutlineLink, AiOutlineTwitter } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { Tooltip } from "src/components/Tooltip";
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
import { FollowerPopover } from "src/pages/users/components/FollowerPopover";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

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
  const userInfo = useReactiveVar(userInfoVar);

  return (
    <>
      <NextSeo
        title={(props.user?.relatedUser?.profileName || props.user?.username) + "のプロフィール"}
      />

      <div>
        <section>
          <div className="md:flex py-4 md:py-8 px-8 md:px-16">
            <img
              src={
                // プロフィール画像を設定していなければGoogleアカウントの画像を表示
                props.user?.relatedUser?.profileImage
                  ? `${MEDIAFILE_API_ENDPOINT}${props.user.relatedUser.profileImage}`
                  : props.user?.relatedUser?.googleImageUrl ?? ""
              }
              alt="Profile Icon"
              className="block object-cover overflow-hidden mr-8 w-32 h-32 rounded-full"
            />
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{props.user?.relatedUser?.profileName}</h1>
                {/* 自分のプロフィール化によってボタンを出し分け */}
                {!userInfo.isLoading && userInfo.userId === props.user?.id && <EditProfileButton />}
                {!userInfo.isLoading && userInfo.userId !== props.user?.id && (
                  <FollowButton pageUserId={props.user?.id ?? ""} />
                )}
              </div>
              <p>{props.user?.relatedUser?.selfIntroduction || "自己紹介はありません"}</p>

              {/* フォロワーやいいね、アイデアの数など */}
              <div className="flex items-center">
                <FollowerPopover {...props} />
                <p className="mr-4">
                  <span className="text-lg font-bold">
                    {props.user?.ideaCreator.edges.length.toString()}
                  </span>{" "}
                  Ideas
                </p>
              </div>

              {/* TwitterやGitHubなどのリンク */}
              <div className="flex items-center">
                {props.user?.relatedUser?.githubUsername && (
                  <Tooltip tooltipText={`@${props.user.relatedUser.githubUsername}`}>
                    <a
                      href={`https://github.com/${props.user.relatedUser.githubUsername}`}
                      target="_blank"
                      className="block mx-1"
                      rel="noreferrer"
                      data-tip={`@${props.user.relatedUser.githubUsername}`}
                    >
                      <AiOutlineGithub className="block w-6 h-6 text-gray-500" />
                    </a>
                  </Tooltip>
                )}
                {props.user?.relatedUser?.twitterUsername && (
                  <Tooltip tooltipText={`@${props.user.relatedUser.twitterUsername}`}>
                    <a
                      href={`https://twitter.com/${props.user.relatedUser.twitterUsername}`}
                      target="_blank"
                      className="block mx-1"
                      rel="noreferrer"
                      data-tip={`@${props.user.relatedUser.twitterUsername}`}
                    >
                      <AiOutlineTwitter className="block w-6 h-6 text-gray-500" />
                    </a>
                  </Tooltip>
                )}
                {props.user?.relatedUser?.websiteUrl && (
                  <Tooltip tooltipText={`${props.user.relatedUser.websiteUrl}`}>
                    <a
                      href={props.user.relatedUser.websiteUrl}
                      target="_blank"
                      className="block mx-1"
                      rel="noreferrer"
                      data-tip={`${props.user.relatedUser.websiteUrl}`}
                    >
                      <AiOutlineLink className="block w-6 h-6 text-gray-500" />
                    </a>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </section>

        <div>
          アイデア
          <br />
          {props.user?.ideaCreator.edges.map((idea) => {
            return (
              <div className="m-2 bg-green-100" key={idea?.node?.id}>
                {idea?.node?.title}
                <br />
                いいねの数:{idea?.node?.likedIdea.edges.length.toString()}
                <br />
                {idea?.node?.isPublished ? "公開" : <BiLockAlt className="w-6 h-6" />}
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

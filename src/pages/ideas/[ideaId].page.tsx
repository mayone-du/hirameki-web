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
import { NewCommentForm } from "src/pages/ideas/components/NewCommentForm";
import { IdeaPreview } from "src/pages/ideas/new/components/IdeaPreview";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

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

// アイデアの詳細ページ
const IdeasDetailPage: CustomNextPage<GetIdeaQuery | undefined> = (props) => {
  const userInfo = useReactiveVar(userInfoVar);

  return (
    <>
      <NextSeo title={props.idea?.title ?? "アイデア"} />

      <div className="md:flex">
        <article className="p-2 md:mr-4 md:w-2/3 rounded-xl border">
          <div>{props.idea?.ideaCreator.id === userInfo.userId && "自分のアイデアです"}</div>

          <h1 className="text-2xl font-bold text-center">{props.idea?.title}</h1>
          <p>{props.idea?.content}</p>
          <p className="text-sm text-gray-700">{props.idea?.createdAt}</p>

          <div className="bg-red-50">
            <IdeaPreview markdown={props.idea?.content ?? ""} />
          </div>

          {/* コメント */}
          <div className="bg-yellow-200">
            {props.idea?.targetIdea.edges.length === 0 ? (
              <div>コメントはありません</div>
            ) : (
              <div>
                {props.idea?.targetIdea.edges.map((thread, threadIndex) => {
                  return (
                    <div key={threadIndex.toString()} className="p-2 my-2 border border-red-200">
                      <div>
                        {thread?.node?.targetThread.edges.map((comment, commentIndex) => {
                          return (
                            <div
                              key={commentIndex.toString()}
                              className="p-2 bg-blue-100 border border-gray-500"
                            >
                              <p>{comment?.node?.content}</p>
                            </div>
                          );
                        })}
                        <button className="block p-2 bg-blue-300 rounded border">
                          コメントを追加
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="mt-4 font-bold">コメントする</h3>
            <NewCommentForm ideaId={props.idea?.id ?? ""} />
          </div>
        </article>

        {/* サイドバー */}
        <aside className="p-2 md:ml-4 md:w-1/3 rounded-xl border">
          <div className="flex items-center">
            {props.idea?.topics.edges.length === 0 && <p>トピックはありません</p>}
            {props.idea?.topics.edges.map((topic, index) => {
              return (
                <div key={index.toString()} className="border">
                  {topic?.node?.name}
                </div>
              );
            })}
          </div>

          <div>
            <div className="flex items-center">
              <img
                className="block object-cover overflow-hidden w-14 h-14 rounded-full"
                src={
                  props.idea?.ideaCreator.relatedUser?.profileImage
                    ? `${MEDIAFILE_API_ENDPOINT}${props.idea.ideaCreator.relatedUser.profileImage}`
                    : props.idea?.ideaCreator.relatedUser?.googleImageUrl ?? ""
                }
                alt=""
              />
              <div>{props.idea?.ideaCreator.relatedUser?.profileName}</div>
            </div>
            <p>{props.idea?.ideaCreator.relatedUser?.selfIntroduction}</p>
          </div>

          <div>いいねの数: {props.idea?.likedIdea.edges.length.toString()}</div>
        </aside>
      </div>
    </>
  );
};

export default IdeasDetailPage;

IdeasDetailPage.getLayout = Layout;

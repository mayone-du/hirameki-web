import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage, GetStaticProps } from "next";
import { signOut } from "next-auth/client";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import { NotAuth } from "src/components/NotAuth";
import { UserLoading } from "src/components/UserLoading";
import { userInfoVar } from "src/graphql/apollo/cache";
import { initializeApollo } from "src/graphql/apollo/client";
import type { GetIndexPageItemsQuery } from "src/graphql/schemas/schema";
import { GetIndexPageItemsDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { IdeaList, MemoList } from "src/pages/root/components";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null, "");
  const { data } = await apolloClient.query<GetIndexPageItemsQuery>({
    query: GetIndexPageItemsDocument,
  });

  return { props: data };
};

const IndexPage: CustomNextPage<GetIndexPageItemsQuery | undefined> = (props) => {
  const userInfo = useReactiveVar(userInfoVar);

  return (
    <>
      <NextSeo title="トップページ" />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "HOME",
            item: "http://localhost:3000/",
          },
        ]}
      />
      {userInfo.isLoading ? (
        // ユーザー情報のローディング
        <UserLoading />
      ) : !userInfo.isLoading && !userInfo.isLogin ? (
        // 非ログイン時
        <NotAuth />
      ) : (
        // 通常時
        <div>
          <div>
            <h2 className="py-4 text-2xl font-bold text-center">Idea</h2>
            <IdeaList {...props} />
          </div>
          <div>
            <h2 className="py-4 text-2xl font-bold text-center">Memo</h2>
            <MemoList {...props} />
          </div>
        </div>
      )}

      <button className="block p-2 mx-auto bg-red-200 rounded-lg" onClick={signOut}>
        sign out
      </button>
    </>
  );
};

export default IndexPage;

IndexPage.getLayout = Layout;

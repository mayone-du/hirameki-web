import type { CustomNextPage, GetStaticProps } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { initializeApollo } from "src/graphql/apollo/client";
import type { GetAllUsersQuery, GetAllUsersQueryVariables } from "src/graphql/schemas/schema";
import { GetAllUsersDocument } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null, "");
  const { data } = await apolloClient.query<GetAllUsersQuery, GetAllUsersQueryVariables>({
    query: GetAllUsersDocument,
  });

  return { props: data, revalidate: 5 /* 5sec */ };
};

const UsersIndexPage: CustomNextPage<GetAllUsersQuery | undefined> = (props) => {
  const PAGE_NAME = "ユーザー一覧";

  return (
    <>
      <NextSeo title={PAGE_NAME} />

      <div>
        {props.allUsers?.edges.map((user, index) => {
          return (
            <div key={index.toString()} className="p-2 m-2 bg-blue-50 rounded">
              <Link href={`/users/${user?.node?.id}`}>
                <a className="block">{user?.node?.username}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UsersIndexPage;

UsersIndexPage.getLayout = Layout;

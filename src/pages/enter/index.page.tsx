import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { userInfoVar } from "src/graphql/apollo/cache";
import { Layout } from "src/layouts";

// 非ログインユーザーがダッシュボードページなどへアクセスした場合にリダイレクトされるページ
const EnterIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo.isLoading && userInfo.isLogin) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <>
      <NextSeo title="Login" noindex />

      <div>ログインを促すページ</div>
    </>
  );
};

export default EnterIndexPage;

EnterIndexPage.getLayout = Layout;

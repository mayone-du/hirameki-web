import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { ThemeChanger } from "src/components/ThemeChanger";
import { userInfoVar } from "src/graphql/apollo/cache";
import { Layout } from "src/layouts";

const SettingsIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);

  return (
    <>
      <NextSeo title="Settings" noindex />

      {!userInfo.isLoading && userInfo.isLogin && (
        <div>
          <h2 className="py-4 text-2xl font-bold text-center">Settings</h2>
          <ThemeChanger />
        </div>
      )}
    </>
  );
};

export default SettingsIndexPage;

SettingsIndexPage.getLayout = Layout;

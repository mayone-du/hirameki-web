import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { ThemeChanger } from "src/components/ThemeChanger";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useGetUserSettingsLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { ImageForm, ProfileForm } from "src/pages/settings/components";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

const SettingsIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);

  const [query, { data }] = useGetUserSettingsLazyQuery();

  useEffect(() => {
    if (!userInfo.isLoading && userInfo.isLogin) {
      query({
        variables: {
          id: userInfo.userId,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, userInfo.isLogin]);

  return (
    <>
      <NextSeo title="Settings" noindex />

      {!userInfo.isLoading && userInfo.isLogin && (
        <div>
          <h2 className="py-4 text-2xl font-bold text-center">Settings</h2>

          <div className="flex mx-auto md:w-3/4 lg:w-3/5">
            {data && (
              <ImageForm
                profileId={data?.user?.relatedUser?.id ?? ""}
                profileImagePath={
                  data?.user?.relatedUser?.profileImage
                    ? `${MEDIAFILE_API_ENDPOINT}${data.user.relatedUser.profileImage}`
                    : data?.user?.relatedUser?.googleImageUrl ?? ""
                }
              />
            )}

            {/* プロフィール画像以外 */}
            {data && <ProfileForm {...data} />}
          </div>

          <ThemeChanger />
        </div>
      )}
    </>
  );
};

export default SettingsIndexPage;

SettingsIndexPage.getLayout = Layout;

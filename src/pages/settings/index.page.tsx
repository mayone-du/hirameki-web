import { useReactiveVar } from "@apollo/client";
import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ThemeChanger } from "src/components/ThemeChanger";
import { userInfoVar } from "src/graphql/apollo/cache";
import { useGetUserSettingsLazyQuery } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";
import { ImageForm } from "src/pages/settings/components/ImageForm";

type FormInputs = {
  profileName: string;
  selfIntroduction?: string;
  githubUsername?: string;
  twitterUsername?: string;
  websiteUrl?: string;
};

const SettingsIndexPage: CustomNextPage = () => {
  const userInfo = useReactiveVar(userInfoVar);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormInputs>();

  const [query, { data }] = useGetUserSettingsLazyQuery();

  useEffect(() => {
    if (!userInfo.isLoading && userInfo.isLogin) {
      query({
        variables: {
          id: userInfo.userId,
        },
      });

      setValue("profileName", data?.user?.relatedUser?.profileName ?? "asdfds");
      setValue("selfIntroduction", data?.user?.relatedUser?.selfIntroduction ?? "");
      setValue("githubUsername", data?.user?.relatedUser?.githubUsername ?? "");
      setValue("twitterUsername", data?.user?.relatedUser?.twitterUsername ?? "");
      setValue("websiteUrl", data?.user?.relatedUser?.websiteUrl ?? "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, userInfo.isLogin]);

  // 画像以外のプロフィールの更新用関数
  const onSubmit = useCallback(async (formData: FormInputs) => {
    // eslint-disable-next-line no-console
    console.log(formData);
    return;
  }, []);

  return (
    <>
      <NextSeo title="Settings" noindex />

      {!userInfo.isLoading && userInfo.isLogin && (
        <div>
          <h2 className="py-4 text-2xl font-bold text-center">Settings</h2>

          <div className="flex mx-auto md:w-3/4 lg:w-3/5">
            <ImageForm
              profileImagePath={
                data?.user?.relatedUser?.profileImage
                  ? data.user.relatedUser.profileImage
                  : data?.user?.relatedUser?.googleImageUrl ?? ""
              }
            />

            {/* プロフィール画像以外 */}
            <form className="block w-2/3" onSubmit={handleSubmit(onSubmit)}>
              <label className="block">
                表示名
                <input
                  type="text"
                  className="block p-2 rounded border focus:ring-2 ring-blue-400 outline-none"
                  placeholder="名前（ニックネーム）"
                  {...register("profileName", { required: true, maxLength: 30 })}
                />
              </label>
              {errors.profileName?.type === "required" && <p>ニックネームは必須です</p>}

              <label className="block">
                自己紹介
                <textarea
                  className="block p-2 w-full rounded border focus:ring-2 ring-blue-400 outline-none resize-none"
                  placeholder="自己紹介を書きましょう"
                  rows={4}
                  {...register("selfIntroduction", { maxLength: 1000 })}
                ></textarea>
              </label>

              <div className="flex items-center">
                <label className="block">
                  GitHubユーザーネーム
                  <input
                    type="text"
                    className="block p-2 rounded border focus:ring-2 ring-blue-400 outline-none"
                    placeholder="GitHub"
                    {...register("githubUsername")}
                  />
                </label>
                <label className="block">
                  Twitterユーザーネーム
                  <input
                    type="text"
                    className="block p-2 rounded border focus:ring-2 ring-blue-400 outline-none"
                    placeholder="Twitter"
                    {...register("twitterUsername")}
                  />
                </label>
              </div>
              <label className="block">
                WebサイトURL
                <input
                  type="text"
                  className="block p-2 rounded border focus:ring-2 ring-blue-400 outline-none"
                  placeholder="Web"
                  {...register("websiteUrl")}
                />
              </label>

              <button type="submit" className="block p-2 mx-auto rounded border">
                更新
              </button>
            </form>
          </div>

          <ThemeChanger />
        </div>
      )}
    </>
  );
};

export default SettingsIndexPage;

SettingsIndexPage.getLayout = Layout;

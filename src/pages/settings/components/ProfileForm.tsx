import { useReactiveVar } from "@apollo/client";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userInfoVar } from "src/graphql/apollo/cache";
import type { GetUserSettingsQuery } from "src/graphql/schemas/schema";
import { useUpdateProfileMutation } from "src/graphql/schemas/schema";

type FormInputs = {
  profileName: string;
  selfIntroduction?: string;
  githubUsername?: string;
  twitterUsername?: string;
  websiteUrl?: string;
};

export const ProfileForm: React.VFC<GetUserSettingsQuery> = (props) => {
  const userInfo = useReactiveVar(userInfoVar);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm<FormInputs>();
  const [mutation, { loading: isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setValue("profileName", props.user?.relatedUser?.profileName ?? "asdfds");
    setValue("selfIntroduction", props.user?.relatedUser?.selfIntroduction ?? "");
    setValue("githubUsername", props.user?.relatedUser?.githubUsername ?? "");
    setValue("twitterUsername", props.user?.relatedUser?.twitterUsername ?? "");
    setValue("websiteUrl", props.user?.relatedUser?.websiteUrl ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 画像以外のプロフィールの更新用関数
  const onSubmit = useCallback(async (formData: FormInputs) => {
    const toastId = toast.loading("プロフィールを更新中");
    try {
      const { errors } = await mutation({
        variables: {
          ...formData,
          profileId: props.user?.relatedUser?.id ?? "",
        },
      });

      if (errors) {
        throw errors;
      }

      userInfoVar({
        ...userInfo,
        profileName: getValues("profileName"),
      });
      toast.success("プロフィールを更新しました", { id: toastId });
    } catch (error) {
      toast.error("プロフィールの更新に失敗しました", { id: toastId });
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="block md:pl-4 md:w-2/3" onSubmit={handleSubmit(onSubmit)}>
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

      <button type="submit" className="block p-2 mx-auto rounded border" disabled={isLoading}>
        更新
      </button>
    </form>
  );
};

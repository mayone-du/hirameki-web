import type { CustomNextPage } from "next";
import { NextSeo } from "next-seo";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateMemoMutation } from "src/graphql/schemas/schema";
import { Layout } from "src/layouts";

type MemoInput = {
  title: string;
};

const MemoNewIndexPage: CustomNextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MemoInput>();
  const [mutation, { error: mutationError }] = useCreateMemoMutation();

  const onSubmit = async (formData: MemoInput) => {
    const toastId = toast.loading("メモを作成中");
    try {
      const { errors: mutationErrors } = await mutation({ variables: { title: formData.title } });
      if (mutationError || mutationErrors) {
        throw mutationError || mutationErrors;
      }
      toast.success("メモを作成しました", { id: toastId });
    } catch (error) {
      toast.error("メモの作成に失敗しました", { id: toastId });
      console.error(error);
    }
  };
  return (
    <>
      <NextSeo title="メモの作成" noindex />

      <div>
        <h1>メモの作成</h1>
        <form onSubmit={handleSubmit(onSubmit)}></form>
        <input
          type="text"
          className="block p-2 border"
          placeholder="メモのタイトル"
          {...register("title", { required: true, maxLength: 30 })}
        />
        {errors.title?.type === "required" && "タイトルは必須です"}
      </div>
    </>
  );
};

export default MemoNewIndexPage;

MemoNewIndexPage.getLayout = Layout;

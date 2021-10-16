import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateCommentMutation, useCreateThreadMutation } from "src/graphql/schemas/schema";

type CommentInput = {
  comment: string;
};

type Props = {
  ideaId: string;
};

// 新しいスレッドとコメントを作成するフォーム
export const NewCommentForm: React.VFC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentInput>();
  const [createThread, { loading: isThreadLoading }] = useCreateThreadMutation();
  const [createComment, { loading: isCommentLoading }] = useCreateCommentMutation();

  const onSubmit = async (formData: CommentInput) => {
    const toastId = toast.loading("コメントを送信中です");
    try {
      // スレッドを作成し、そこにコメントを追加する
      const { data: threadData, errors: threadErrors } = await createThread({
        variables: {
          threadTargetType: "Idea",
          targetIdeaId: props.ideaId,
        },
      });
      if (threadErrors) throw threadErrors;

      const { errors: commentErrors } = await createComment({
        variables: {
          targetThreadId: threadData?.createThread?.thread?.id ?? "",
          content: formData.comment,
        },
      });
      if (commentErrors) throw commentErrors;
      toast.success("コメントを送信しました", { id: toastId });
    } catch (error) {
      toast.error("コメントを送信出来ませんでした", { id: toastId });
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="block p-2 mb-4 w-full rounded border focus:ring-2 ring-blue-300 transition-all outline-none resize-none"
        placeholder="アイデアにコメントする"
        {...register("comment", { required: true })}
      ></textarea>
      {errors.comment && "コメントは必須です"}
      <button
        type="submit"
        className="block p-2 mx-auto rounded border"
        disabled={isThreadLoading || isCommentLoading}
      >
        送信
      </button>
    </form>
  );
};

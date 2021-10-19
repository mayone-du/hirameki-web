import "easymde/dist/easymde.min.css";

import type EasyMDE from "easymde";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { SimpleMdeReact } from "react-simplemde-editor";
import { IdeaMarkdown } from "src/components/IdeaMarkdown";
import { useCreateIdeaMutation, useUpdateIdeaMutation } from "src/graphql/schemas/schema";

type Props = {
  title: string;
  isPublished: boolean;
  markdown: string;
  ideaId?: string;
};
export const IdeaEditor: React.VFC<Props> = (props) => {
  const [markdownValue, setMarkdownValue] = useState(props.markdown);
  const [title, setTitle] = useState(props.title);
  const [isPublished, setIsPublished] = useState(props.isPublished);
  const [createIdea, { loading: isCreateLoading }] = useCreateIdeaMutation();
  const [updateIdea, { loading: isUpdateLoding }] = useUpdateIdeaMutation();

  const handleChangeMarkdown = useCallback((markdownValue: string) => {
    setMarkdownValue(markdownValue);
  }, []);

  const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const handleChangePublish = useCallback(() => {
    setIsPublished((prev) => {
      return !prev;
    });
  }, []);

  const editorOptions: EasyMDE.Options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      toolbar: false,
    };
  }, []);

  // 作成用関数
  const handleCreateIdea = async () => {
    const toastId = toast.loading("作成中");
    if (title === "") return toast.error("タイトルは必須です", { id: toastId });
    try {
      const { errors } = await createIdea({
        variables: {
          title: title,
          content: markdownValue,
          isPublished: isPublished,
        },
      });
      if (errors) throw errors;
      toast.success("アイデアを作成しました", { id: toastId });
    } catch (error) {
      toast.error("アイデアの作成に失敗しました", { id: toastId });
      console.error(error);
    }
  };

  // 更新陽関数
  const handleUpdateIdea = async () => {
    const toastId = toast.loading("更新中");
    if (title === "") return toast.error("タイトルは必須です", { id: toastId });
    try {
      const { errors } = await updateIdea({
        variables: {
          ideaId: props.ideaId ?? "",
          title: title,
          content: markdownValue,
          isPublished: isPublished,
        },
      });
      if (errors) throw errors;
      toast.success("アイデアを更新しました", { id: toastId });
    } catch (error) {
      toast.error("アイデアの更新に失敗しました", { id: toastId });
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          className="block p-2 border"
          placeholder="タイトル"
          value={title}
          onChange={handleChangeTitle}
        />
        <button className="block" onClick={handleChangePublish}>
          {isPublished ? "このままだと公開" : "このままだと非公開"}
        </button>
        <SimpleMdeReact
          value={markdownValue}
          onChange={handleChangeMarkdown}
          options={editorOptions}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center">Preview</h2>
        <IdeaMarkdown markdown={markdownValue} />
      </div>

      {props.ideaId ? (
        <button
          onClick={handleUpdateIdea}
          disabled={isUpdateLoding}
          className="block p-2 bg-blue-100 border"
        >
          保存
        </button>
      ) : (
        <button
          onClick={handleCreateIdea}
          disabled={isCreateLoading}
          className="block p-2 bg-blue-100 border"
        >
          作成
        </button>
      )}
    </div>
  );
};

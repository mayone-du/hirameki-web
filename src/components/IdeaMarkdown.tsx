import ReactMarkdown from "react-markdown";

type Props = {
  markdown: string;
};

export const IdeaMarkdown: React.FC<Props> = (props) => {
  if (props.markdown === "") {
    return <div>コンテンツがありません</div>;
  }
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="pb-6 markdown">
      <ReactMarkdown>{props.markdown.replaceAll("\n", "  \n")}</ReactMarkdown>
    </div>
  );
};

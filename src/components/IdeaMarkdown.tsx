import ReactMarkdown from "react-markdown";

type Props = {
  markdown: string;
};

export const IdeaMarkdown: React.FC<Props> = (props) => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="markdown">
      <ReactMarkdown>{props.markdown}</ReactMarkdown>
    </div>
  );
};

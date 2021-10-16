import ReactMarkdown from "react-markdown";

type Props = {
  markdown: string;
};

export const IdeaPreview: React.FC<Props> = (props) => {
  return (
    <div>
      <ReactMarkdown>{props.markdown}</ReactMarkdown>
    </div>
  );
};

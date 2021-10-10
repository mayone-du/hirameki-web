import "draft-js/dist/Draft.css";

import { Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";

export const IdeaEditor = () => {
  const [isEditorEnable, setIsEditorEnable] = useState(false);
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  useEffect(() => {
    setIsEditorEnable(true);
  }, []);

  return (
    <>
      {isEditorEnable && (
        <Editor
          placeholder="Write something!"
          editorKey="test-key"
          editorState={editorState}
          onChange={setEditorState}
        />
      )}
    </>
  );
};

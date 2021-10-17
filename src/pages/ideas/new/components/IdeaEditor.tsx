import "easymde/dist/easymde.min.css";

import type EasyMDE from "easymde";
import { useCallback, useMemo, useState } from "react";
import { SimpleMdeReact } from "react-simplemde-editor";
import { IdeaPreview } from "src/pages/ideas/new/components/IdeaPreview";

export const IdeaEditor = () => {
  const [value, setValue] = useState("Initial value");

  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const editorOptions: EasyMDE.Options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      toolbar: false,
    };
  }, []);

  return (
    <div>
      <div>
        <SimpleMdeReact value={value} onChange={handleChange} options={editorOptions} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center">Preview</h2>
        <IdeaPreview markdown={value} />
      </div>
    </div>
  );
};
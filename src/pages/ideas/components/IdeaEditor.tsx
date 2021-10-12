import "easymde/dist/easymde.min.css";

import { useCallback, useState } from "react";
import SimpleMdeReact from "react-simplemde-editor";

export const IdeaEditor = () => {
  const [value, setValue] = useState("Initial value");

  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <div>
      <div>
        <SimpleMdeReact value={value} onChange={handleChange} />
      </div>
    </div>
  );
};

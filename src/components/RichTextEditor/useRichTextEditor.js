import { EditorState } from "draft-js";
import React, { useState } from "react";

const useRichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newEditorState) => setEditorState(newEditorState);
  return {};
};

export default useRichTextEditor;

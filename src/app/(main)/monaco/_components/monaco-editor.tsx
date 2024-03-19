import React from "react";

import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import ToolBar from "./tool-bar";

type Props = {
  handleOnChange: (value?: string) => void;
};

const MonacoEditor = ({ handleOnChange }: Props) => {
  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);

  return (
    <div className="flex flex-col">
      <ToolBar editorRef={editorRef} />
      <Editor
        className="min-h-[300px] w-full"
        defaultLanguage="mdx"
        theme="vs-dark"
        defaultValue="# Start writing your MDX here"
        onChange={handleOnChange}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
};

export default MonacoEditor;

import React from "react";

import { Editor, useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import ToolBar from "./tool-bar";

type Props = {
  handleOnChange: (value?: string) => void;
};

const MonacoEditor = ({ handleOnChange }: Props) => {
  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);

  const monaco = useMonaco();

  React.useEffect(() => {
    if (monaco) {
      monaco.editor.addEditorAction({
        id: "save",
        label: "Save",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK],
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
        run: function (ed) {},
      });
    }
  }, [monaco]);

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

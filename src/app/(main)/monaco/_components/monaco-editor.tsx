import React from "react";

import { Editor, Monaco, useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import ToolBar from "./tool-bar";
import ComponentSelect from "@/components/component-select";

import { createDependencyProposals } from "@/utils/code-snippets";

type Props = {
  handleOnChange: (value?: string) => void;
};

const MonacoEditor = ({ handleOnChange }: Props) => {
  const [open, setOpen] = React.useState(false);
  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);

  const monaco = useMonaco();

  React.useEffect(() => {
    if (monaco) {
      monaco.editor.addEditorAction({
        id: "addComponent",
        label: "Add Component",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK],
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,
        run: () => {
          setOpen(true);
        },
      });

      monaco.languages.registerCompletionItemProvider("mdx", {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };
          return {
            suggestions: createDependencyProposals(range, monaco),
          };
        },
      });
    }
  }, [monaco]);

  return (
    <div className="flex flex-col">
      <ToolBar editorRef={editorRef} />
      <ComponentSelect open={open} setOpen={setOpen} editorRef={editorRef} />
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

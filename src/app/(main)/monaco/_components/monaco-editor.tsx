import React from "react";

import { Editor, useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import ComponentSelect from "@/components/component-select";

import { createDependencyProposals } from "@/utils/code-snippets";
import { useTheme } from "next-themes";

import { wireTmGrammars } from "monaco-editor-textmate";
import { Registry } from "monaco-textmate";
import { loadWASM } from "onigasm";
import defineTheme from "@/utils/define-theme";

//public folder
import themeDark from "../../../../../public/github-dark-theme.json";
import themeLight from "../../../../../public/github-light.theme.json";

type Props = {
  handleOnChange: (value?: string) => void;
};

const MonacoEditor = ({ handleOnChange }: Props) => {
  const [isThemeLoaded, setIsThemeLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null);
  const { resolvedTheme } = useTheme();

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

  React.useEffect(() => {
    if (monaco) {
      const loadGrammar = async () => {
        try {
          await loadWASM("/onigasm.wasm");

          const registry = new Registry({
            getGrammarDefinition: async (scopeName) => {
              switch (scopeName) {
                case "source.mdx":
                  return {
                    format: "json",
                    content: await (await fetch(`/mdx.tmLanguage.json`)).text(),
                  };
                case "source.ts":
                  return {
                    format: "json",
                    content: await (
                      await fetch(`/typescript.tmLanguage.json`)
                    ).text(),
                  };
                case "source.tsx":
                  return {
                    format: "json",
                    content: await (await fetch(`/tsx.tmLanguage.json`)).text(),
                  };
                case "source.js":
                  return {
                    format: "json",
                    content: await (
                      await fetch(`/javascript.tmLanguage.json`)
                    ).text(),
                  };
                case "source.json":
                  return {
                    format: "json",
                    content: await (
                      await fetch(`/json.tmLanguage.json`)
                    ).text(),
                  };
                default:
                  return { format: "json", content: {} };
              }
            },
          });

          const grammars = new Map();
          grammars.set("mdx", "source.mdx");
          grammars.set("typescript", "source.ts");
          grammars.set("typescriptreact", "source.tsx");
          grammars.set("javascript", "source.js");
          grammars.set("json", "source.json");

          monaco.languages.register({ id: "mdx" });
          monaco.languages.register({ id: "typescript" });
          monaco.languages.register({ id: "typescriptreact" });
          monaco.languages.register({ id: "javascript" });
          monaco.languages.register({ id: "json" });

          defineTheme(monaco, themeDark, "github-dark");
          defineTheme(monaco, themeLight, "github-light");

          if (editorRef.current) {
            await wireTmGrammars(monaco, registry, grammars, editorRef.current);
          }

          setIsThemeLoaded(true);
        } catch (error) {
          console.error("Error loading grammars or WASM", error);
        }
      };

      loadGrammar();
    }
  }, [monaco]);

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col">
      <ComponentSelect open={open} setOpen={setOpen} editorRef={editorRef} />
      <Editor
        className="h-full w-full"
        defaultLanguage="mdx"
        defaultValue="# Start writing your MDX here"
        onChange={handleOnChange}
        options={{
          theme:
            isThemeLoaded && resolvedTheme === "dark"
              ? "github-dark"
              : "github-light",
        }}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
};

export default MonacoEditor;

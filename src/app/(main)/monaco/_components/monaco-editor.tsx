import React from "react";

import { Editor, useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import ComponentSelect from "@/components/component-select";

import { createDependencyProposals } from "@/utils/code-snippets";
import { useTheme } from "next-themes";

import { getHighlighter } from "shiki";

import { normalizeColor } from "@/utils/shiki";

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
        beforeMount={async (monaco) => {
          const highlighter = await getHighlighter({
            themes: ["github-dark", "github-light"],
            langs: ["mdx"],
          });

          const darkTheme = highlighter.getTheme("github-dark");
          const lightTheme = highlighter.getTheme("github-light");

          const darkThemeRules = darkTheme.settings.map((setting) => {
            if (setting.scope) {
              if (Array.isArray(setting.scope)) {
                return setting.scope.map((scope) => {
                  return {
                    token: scope,
                    foreground: normalizeColor(setting.settings.foreground),
                    background: normalizeColor(setting.settings.background),
                  };
                });
              }
            }
            return {
              token: setting.scope ?? "",
              foreground: normalizeColor(setting.settings.foreground),
              background: normalizeColor(setting.settings.background),
            };
          });

          const lightThemeRules = lightTheme.settings.map((setting) => {
            if (setting.scope) {
              if (Array.isArray(setting.scope)) {
                return setting.scope.map((scope) => {
                  return {
                    token: scope,
                    foreground: normalizeColor(setting.settings.foreground),
                    background: normalizeColor(setting.settings.background),
                  };
                });
              }
            }
            return {
              token: setting.scope ?? "",
              foreground: normalizeColor(setting.settings.foreground),
              background: normalizeColor(setting.settings.background),
            };
          });

          monaco.editor.defineTheme("github-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [...darkThemeRules.flat()],
            colors: {
              ...darkTheme.colors,
            },
          });

          monaco.editor.defineTheme("github-light", {
            base: "vs-dark",
            inherit: true,
            rules: [...lightThemeRules.flat()],
            colors: {
              ...lightTheme.colors,
            },
          });

          setIsThemeLoaded(true);
        }}
      />
    </div>
  );
};

export default MonacoEditor;

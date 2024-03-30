import React from "react";

import { markdown, markdownLanguage } from "@codemirror/lang-markdown";

import {
  githubLight,
  githubLightInit,
  githubDark,
  githubDarkInit,
} from "@uiw/codemirror-theme-github";

import { languages } from "@codemirror/language-data";

import { insertNewline } from "@codemirror/commands";

type Props = {
  handleOnChange: (value?: string) => void;
};

import CodeMirror, { KeyBinding, keymap } from "@uiw/react-codemirror";
import { useTheme } from "next-themes";

function CodeMirrorEditor({ handleOnChange }: Props) {
  const { theme } = useTheme();

  const keyBindings: readonly KeyBinding[] = [
    {
      key: "Mod-k",
      run: () => {
        console.log("Ctrl + K pressed");

        return true;
      },
    },
    {
      key: "Mod-x",
      run: (view) => {
        const { state } = view;

        const textToBeInserted = "# Heading";

        const cursorPos = state.selection.main.head;
        const lineText = state.doc.lineAt(cursorPos).text;

        view.dispatch({
          changes: {
            from: cursorPos,
            to: cursorPos,
            insert: textToBeInserted,
          },
        });

        return insertNewline(view);
      },
    },
  ];

  return (
    <div className="flex flex-col">
      <CodeMirror
        className="h-full w-full"
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
          keymap.of(keyBindings),
        ]}
        value="# Start writing your MDX here"
        theme={theme === "dark" ? githubDark : githubLight}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default CodeMirrorEditor;

import React from "react";
import type { editor } from "monaco-editor";

type Props = {
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
};

const ToolBar = ({ editorRef }: Props) => {
  //TODO: MAKE THIS GENERAL
  const addHeading = () => {
    const headingText = "Heading Text";

    if (editorRef.current) {
      const editor = editorRef.current;
      const selection = editor.getSelection();
      const cursorPosition = selection ? selection.getStartPosition() : null;

      if (cursorPosition) {
        editor.executeEdits("", [
          {
            range: {
              startLineNumber: selection?.selectionStartLineNumber || 1,
              startColumn: selection?.selectionStartColumn || 1,
              endLineNumber: selection?.endLineNumber || 1,
              endColumn: selection?.endColumn || 1,
            },
            text: headingText,
          },
        ]);
      }
    }
  };

  return (
    <div>
      <div onClick={addHeading}>Add Heading</div>
    </div>
  );
};

export default ToolBar;

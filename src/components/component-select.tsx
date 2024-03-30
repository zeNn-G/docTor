import React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
  monacoRef: React.MutableRefObject<Monaco | null>;
};

const ComponentSelect = ({ open, setOpen, editorRef, monacoRef }: Props) => {
  const addComponent = (component: string) => {
    if (editorRef.current && monacoRef.current) {
      const editor = editorRef.current;
      const selection = editor.getSelection();
      const cursorPosition = selection ? selection.getStartPosition() : null;

      if (cursorPosition) {
        const lineContent = editor
          .getModel()
          ?.getLineContent(cursorPosition.lineNumber);

        //TODO: Map the component to the actual component
        const textToInsert = lineContent ? `\n${component}` : component;

        editor.executeEdits("", [
          {
            range: {
              startLineNumber: selection?.selectionStartLineNumber || 1,
              startColumn: selection?.selectionStartColumn || 1,
              endLineNumber: selection?.endLineNumber || 1,
              endColumn: selection?.endColumn || 1,
            },
            text: textToInsert,
          },
        ]);
      }

      setOpen(false);

      const timer = setTimeout(() => {
        editor.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => addComponent("# Calander")}>
            Calendar
          </CommandItem>
          <CommandItem onSelect={() => addComponent("Search Emoji")}>
            Search Emoji
          </CommandItem>
          <CommandItem onSelect={() => addComponent("Calculator")}>
            Calculator
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default ComponentSelect;

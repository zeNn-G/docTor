import React from "react";
import type { editor } from "monaco-editor";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  LucideIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { componentsAsText } from "@/constants/components-as-text";

type Props = {
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
};

type ToolbarItemProps = {
  onClick: () => void;
  icon?: LucideIcon;
  label?: string;
};

function ToolbarItem({ onClick, icon: Icon, label }: ToolbarItemProps) {
  return (
    <Button onClick={onClick} size="sm">
      {Icon ? <Icon className="size-5" /> : label}
    </Button>
  );
}

export function ToolBar({ editorRef }: Props) {
  const addComponent = (id: string) => {
    const compAsText = componentsAsText.find((comp) => comp.id === id);

    if (!compAsText) return;

    if (editorRef.current) {
      const editor = editorRef.current;
      const selection = editor.getSelection();
      const cursorPosition = selection ? selection.getStartPosition() : null;

      if (cursorPosition) {
        const lineContent = editor
          .getModel()
          ?.getLineContent(cursorPosition.lineNumber);

        const textToInsert = lineContent
          ? `\n${compAsText.text}`
          : compAsText.text;

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

      const timer = setTimeout(() => {
        editor.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline">
          Add Component
        </AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          <ToolbarItem
            onClick={() => addComponent("heading-1")}
            icon={Heading1}
          />
          <ToolbarItem
            onClick={() => addComponent("heading-2")}
            icon={Heading2}
          />
          <ToolbarItem
            onClick={() => addComponent("heading-3")}
            icon={Heading3}
          />
          <ToolbarItem
            onClick={() => addComponent("heading-4")}
            icon={Heading4}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

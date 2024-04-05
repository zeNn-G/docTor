import {
  codeSnippet,
  linkSnippet,
  orderedListSnippet,
  tableSnippet,
  tabsSnippet,
  unOrderedListSnippet,
} from "@/constants/snippet";

import { Monaco } from "@monaco-editor/react";
import { IRange, languages } from "monaco-editor";

export function createDependencyProposals(
  range: IRange,
  monaco: Monaco,
): languages.CompletionItem[] {
  return [
    {
      label: "tabs",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Add Tabs component",
      insertText: tabsSnippet,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
    {
      label: "codeSnippet",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Add code snippet",
      insertText: codeSnippet,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
    {
      label: "link",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Add Link component",
      insertText: linkSnippet,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
    {
      label: "orderedList",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Add Link component",
      insertText: orderedListSnippet,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
    {
      label: "unOrderedList",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Add Link component",
      insertText: unOrderedListSnippet,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
    {
      label: "table",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Add Link component",
      insertText: tableSnippet,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      range: range,
    },
  ];
}

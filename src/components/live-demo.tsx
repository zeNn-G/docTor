"use client";

import React from "react";

import {
  toolbarPlugin,
  KitchenSinkToolbar,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
  SandpackConfig,
  JsxComponentDescriptor,
  GenericJsxEditor,
  usePublisher,
  insertJsx$,
  jsxPlugin,
  NestedLexicalEditor,
} from "@mdxeditor/editor";

import MDXEditor from "./editor/Editor";
import { ModeToggle } from "./mode-toggle";
import ComponentSelector from "./editor/component-selector";

const LiveDemo = () => {
  const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
      name: "MyLeaf",
      kind: "flow",
      props: [],
      hasChildren: false,
      Editor: () => {
        return <ModeToggle />;
      },
    },
  ];

  const allPlugins = (diffMarkdown: string) => [
    jsxPlugin({ jsxComponentDescriptors }),
    toolbarPlugin({
      toolbarContents: () => (
        <>
          <KitchenSinkToolbar />
          <ComponentSelector />
        </>
      ),
    }),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    // eslint-disable-next-line @typescript-eslint/require-await
    imagePlugin({ imageUploadHandler: async () => "/sample-image.png" }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
    codeMirrorPlugin({
      codeBlockLanguages: {
        js: "JavaScript",
        css: "CSS",
        txt: "text",
        tsx: "TypeScript",
      },
    }),
    directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
    diffSourcePlugin({ viewMode: "rich-text", diffMarkdown }),
    markdownShortcutPlugin(),
  ];

  const [markdown, setMarkdown] = React.useState("");

  return (
    <div>
      <MDXEditor
        markdown={markdown}
        className=""
        plugins={allPlugins(markdown)}
        onChange={setMarkdown}
        contentEditableClassName="prose-headings:mt-2  prose-headings:scroll-m-20 prose-headings:text-4xl prose-headings:font-bold prose-headings:tracking-tight"
      />
    </div>
  );
};

export default LiveDemo;

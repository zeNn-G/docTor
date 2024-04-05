"use client";
import React from "react";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import remarkGfm from "remark-gfm";
import rehypePrettyCode, { Options } from "rehype-pretty-code";

import { useDebounce } from "@uidotdev/usehooks";

import { components as MDXComponents } from "@/components/mdx-components";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// import MonacoEditor from "./_components/monaco-editor";

import { visitNodesToRawString, visitNodesToMetadata } from "@/utils/MDXVisit";

import "@/styles/mdx.css";
// import CodeMirrorEditor from "./_components/code-mirror";

import dynamic from "next/dynamic";

const CodeMirrorEditor = dynamic(() => import("./_components/code-mirror"), {
  ssr: false,
});

const MonacoEditor = dynamic(() => import("./_components/monaco-editor"), {
  ssr: false,
});

const prettyCodeOptions: Partial<Options> = {
  theme: "github-dark",

  onVisitLine(node) {
    if (node.children.length === 0) {
      // if code block has a empty line, add a space instead of keeping it blank
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className = node.properties.className ?? [];
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["word--highlighted"];
  },
};

const firstCode = `# Start writing your MDX here`;

const MonacoPage = () => {
  const [source, setSource] = React.useState<string>(firstCode.trim());
  const [mdxSource, setMdxSource] =
    React.useState<MDXRemoteSerializeResult | null>(null);
  const debouncedSource = useDebounce(source, 300);

  function handleOnChange(value?: string) {
    setSource(value || "");
  }

  React.useEffect(() => {
    (async () => {
      try {
        const serializeResult = await serialize(source.trim(), {
          source: "",
          mdxOptions: {
            format: "mdx",
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              visitNodesToRawString,
              // @ts-ignore
              [rehypePrettyCode, prettyCodeOptions],
              visitNodesToMetadata,
            ],
            development: false,
          },
          parseFrontmatter: true,
        });

        setMdxSource(serializeResult);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [debouncedSource]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <MonacoEditor handleOnChange={handleOnChange} />
        {/* <CodeMirrorEditor handleOnChange={handleOnChange} /> */}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} className="h-full w-full">
        <div className="min-w-full px-3">
          {mdxSource && <MDXRemote {...mdxSource} components={MDXComponents} />}
        </div>
        <ResizableHandle />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MonacoPage;

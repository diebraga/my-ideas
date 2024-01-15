import { useState } from "react";
import { QuoteNode, HeadingNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ToolbarPlugin } from "../ToolbarPlugin/ToolbarPlugin";

const editorConfig = {
  namespace: "MyEditor",
  onError(error: Error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export const TextEditor = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div
        className={`relative mx-auto overflow-hidden my-5 w-full rounded-xl ${
          isFocused ? "border-black border-2" : "border-gray-400 border"
        } text-left font-normal leading-5 text-gray-900`}
      >
        <ToolbarPlugin />
        <div className="relative rounded-b-lg border-opacity-5 bg-white">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="lexical min-h-[280px] resize-none px-2.5 py-4 text-base caret-gray-900 outline-none"
              />
            }
            placeholder={
              <div className="pointer-events-none absolute left-2.5 top-4 inline-block select-none overflow-hidden text-base font-normal text-gray-400">
                Play around with the editor...
              </div>
            }
            // @ts-ignore
            ErrorBoundary={null}
          />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

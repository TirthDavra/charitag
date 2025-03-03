"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import Toolbar from "./Toolbar";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import { ImageTiptap } from "./ImageTiptap";

interface RichTextEditorProps {
  onChange: (data: string) => void;
  placeholder?: string;
  initContent?: string;
}
const Tiptap: React.FC<RichTextEditorProps> = ({
  onChange,
  placeholder = "",
  initContent,
}) => {
  const handleChange = (content: string) => {
    onChange(content);
  };
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      // Image.configure()
      // ImageResize.configure({
      //   inline: true,
      // }),
      ImageTiptap.configure({
        inline: true,
      }),
      Underline,
      CharacterCount.configure({
        mode: "textSize",
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:opacity-50 before-pointer-events-none",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
      Link.configure({
        HTMLAttributes: {
          // Change rel to different value
          // Allow search engines to follow links(remove nofollow)
          rel: "noopener noreferrer",
          // Remove target entirely so links open in current tab
          target: null,
        },
      }),
      // Heading.configure({
      //   levels: [1, 2, 3],
      // }),
    ],
    // content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[477px] max-h-[477px] overflow-auto border border-[#cad6f3] focus:border-merchant_text_color_blue active outline-none p-2",
      },
    },
    content: initContent,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (initContent === "" && editor) {
      editor.commands.clearContent();
    }
  }, [initContent]);

  if (!editor) {
    return (
      <div className="animate-pulse border-[#cad6f3] p-1 ">
        <div className="h-[34px]   rounded-md bg-gray-100 p-1"></div>
        <div className="my-2 h-[459px]  rounded-md bg-gray-100"></div>
        <div className="h-[24px] rounded-md bg-gray-100 pt-[1px]"></div>
      </div>
    );
  }

  return (
    <div className="border-[#cad6f3]">
      <Toolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line " }} editor={editor} />
      <div className="character-count rounded-b-md border-b border-l border-r border-inherit pl-1">
        words: {editor.storage.characterCount.words()} characters:{" "}
        {editor.storage.characterCount.characters()}
      </div>
    </div>
  );
};

export default Tiptap;

import React, { useCallback, useContext } from "react";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddEmailApplicationImage from "@/components/charity/EmailApplication/AddEmailApplicationImage";

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const getButtonClassName = (isActive: boolean) => {
    return isActive
      ? "bg-sky-400/10 text-merchant_text_color_blue"
      : " hover:bg-sky-400/10 hover:text-merchant_text_color_blue";
  };

  const headingOptions = [
    { value: "0", label: "Paragraph" },
    { value: "1", label: "Heading 1" },
    { value: "2", label: "Heading 2" },
    { value: "3", label: "Heading 3" },
  ];
  // const setLink = useCallback(() => {
  //   const previousUrl = editor.getAttributes("link").href;
  //   const url = window.prompt("URL", previousUrl);
  //   // cancelled
  //   if (url === null) {
  //     return;
  //   }
  //   // empty
  //   if (url === "") {
  //     editor.chain().focus().extendMarkRange("link").unsetLink().run();
  //     return;
  //   }

  //   // update link
  //   editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  // }, [editor]);

  return (
    <div className="flex w-full flex-wrap items-start justify-between gap-5 rounded-tl-md rounded-tr-md border-l border-r border-t border-inherit px-1 py-1">
      <div className="flex w-full flex-wrap items-center justify-start gap-1 lg:w-10/12">
        <Select
          defaultValue="0"
          onValueChange={(value) => {
            if (value === "1") {
              editor.chain().focus().setHeading({ level: 1 }).run();
            } else if (value === "2") {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            } else if (value === "3") {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            } else if (value === "0") {
              editor.chain().focus().setParagraph().run();
            }
          }}
          value={
            editor.isActive("heading")
              ? editor.getAttributes("heading").level.toString()
              : "0"
          }
        >
          <SelectTrigger
            classNameIcon="!text-black font-bold"
            className="h-[34px] min-w-[130px] max-w-fit rounded-md border-[1px] border-[#d9e2f9] text-[13px] font-normal text-merchant_gray outline-none"
          >
            <SelectValue placeholder="All Dates" />
          </SelectTrigger>
          <SelectContent className="min-w-[130px]">
            {headingOptions.map((heading) => {
              return (
                <SelectItem value={heading.value} key={heading.value}>
                  {heading.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`box-content p-1 ${getButtonClassName(editor.isActive("bold"))}`}
        >
          <Bold className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`box-content p-1 ${getButtonClassName(editor.isActive("italic"))}`}
        >
          <Italic className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`box-content p-1 ${getButtonClassName(editor.isActive("underline"))}`}
        >
          <Underline className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`box-content p-1 ${getButtonClassName(editor.isActive("strike"))}`}
        >
          <Strikethrough className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`box-content p-1 ${getButtonClassName(editor.isActive("blockquote"))}`}
        >
          <Quote className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`box-content p-1 ${getButtonClassName(editor.isActive({ textAlign: "left" }))}`}
          type="button"
        >
          <AlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`box-content p-1 ${getButtonClassName(editor.isActive({ textAlign: "center" }))}`}
          type="button"
        >
          <AlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`box-content p-1 ${getButtonClassName(editor.isActive({ textAlign: "right" }))}`}
          type="button"
        >
          <AlignRight />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`box-content p-1 ${getButtonClassName(editor.isActive("bulletList"))}`}
        >
          <List className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`box-content p-1 ${getButtonClassName(editor.isActive("orderedList"))}`}
        >
          <ListOrdered className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={`box-content p-1 ${getButtonClassName(editor.isActive("undo"))}`}
        >
          <Undo className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={`box-content p-1 ${getButtonClassName(editor.isActive("redo"))}`}
        >
          <Redo className="h-5 w-5" />
        </button>
        <AddEmailApplicationImage editor={editor} />
        {/* <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          setLink
        </button> */}
      </div>
    </div>
  );
};

export default Toolbar;

"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect, useCallback } from "react";
import {
  TextB,
  TextItalic,
  LinkSimple,
  TextH,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TiptapEditor({
  value,
  onChange,
  placeholder = "Begin writing...",
  className,
  minHeight = "240px",
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-stone max-w-none focus:outline-none",
          "text-[14px] leading-[1.7] text-foreground",
          "[&_h2]:font-serif [&_h2]:text-[20px] [&_h2]:font-normal [&_h2]:mt-6 [&_h2]:mb-2",
          "[&_h3]:font-serif [&_h3]:text-[16px] [&_h3]:font-normal [&_h3]:mt-4 [&_h3]:mb-1",
          "[&_p]:mb-3 [&_p]:leading-[1.7]",
          "[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
          "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={cn("rounded-sm border border-border", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
            editor.isActive("bold") && "bg-muted text-foreground",
          )}
          title="Bold"
        >
          <TextB size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
            editor.isActive("italic") && "bg-muted text-foreground",
          )}
          title="Italic"
        >
          <TextItalic size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
            editor.isActive("heading", { level: 2 }) && "bg-muted text-foreground",
          )}
          title="Heading 2"
        >
          <TextH size={14} />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
            editor.isActive("link") && "bg-muted text-foreground",
          )}
          title="Link"
        >
          <LinkSimple size={14} />
        </button>
        <div className="ml-auto text-[10px] uppercase tracking-[0.08em] text-muted-foreground/60">
          Rich text
        </div>
      </div>

      {/* Bubble menu */}
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="flex items-center gap-0.5 rounded-sm border border-border bg-card shadow-lg px-1 py-1"
      >
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted transition-colors",
            editor.isActive("bold") && "bg-muted text-foreground",
          )}
        >
          <TextB size={13} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted transition-colors",
            editor.isActive("italic") && "bg-muted text-foreground",
          )}
        >
          <TextItalic size={13} />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted transition-colors",
            editor.isActive("link") && "bg-muted text-foreground",
          )}
        >
          <LinkSimple size={13} />
        </button>
      </BubbleMenu>

      {/* Editor area */}
      <div
        className="px-3 py-3"
        style={{ minHeight }}
        onClick={() => editor.chain().focus().run()}
      >
        {editor.isEmpty && (
          <div
            className="pointer-events-none absolute text-[14px] text-muted-foreground/40"
            aria-hidden
          >
            {placeholder}
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

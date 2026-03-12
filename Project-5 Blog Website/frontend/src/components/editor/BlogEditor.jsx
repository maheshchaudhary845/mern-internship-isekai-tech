import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Heading from "@tiptap/extension-heading"
import EditorToolbar from "./EditorToolbar"

export default function BlogEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({
        placeholder: "Write your blog content here..."
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      })
    ],
    content: content || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

  if (!editor) return null

  return (
    <div className="rounded-2xl border bg-card shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-primary">
      <EditorToolbar editor={editor} />
      <div className="p-5">
        <EditorContent
          editor={editor}
          className="prose prose-invert max-w-none min-h-[300px] focus:outline-none"
        />
      </div>
    </div>
  )
} 
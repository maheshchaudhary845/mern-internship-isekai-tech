import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function EditorToolbar({ editor }) {
  if (!editor) return null

  const addImage = async ()=>{
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async()=>{
      const file = input.files[0];
      if(!file) return;

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/uploads/editor-image`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      const data = await res.json();

      if(!res.ok){
        alert("Image upload failed");
        return
      }

      editor.chain().focus().setImage({src: data.url}).run();
    }
    input.click();
  }

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b bg-muted/30">

      <Button
        size="sm"
        variant={editor.isActive("bold") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </Button>

      <Button
        size="sm"
        variant={editor.isActive("italic") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </Button>

      <Button
        size="sm"
        variant={editor.isActive("underline") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        U
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Button
        size="sm"
        variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        H2
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • List
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. List
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        Center
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={() => addImage()}
      >
        Image
      </Button>

    </div>
  )
}
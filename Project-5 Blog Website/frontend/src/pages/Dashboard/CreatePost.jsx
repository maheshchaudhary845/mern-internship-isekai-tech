import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import BlogEditor from "@/components/editor/BlogEditor"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import authFetch from "@/utils/authFetch";

function CreatePost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState("")
    const [image, setImage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
            const { data } = await res.json()
            setCategories(data)
        }
        fetchCategories()
    }, [])

    const handleSubmit = async () => {
        if (!title || !content || !category) {
            alert("Title, Content and Category are required")
            return
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        formData.append("category", category)
        formData.append("tags", JSON.stringify(tags.split(",").map(t => t.trim())))

        if (image) {
            formData.append("image", image)
        }
        try {
            setIsLoading(true)
            const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/posts/add`, {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.message)
                return
            }
            setTitle("");
            setContent("");
            setCategory("");
            setTags("");
            setImage("");
            console.log("Post created:", data)
        } catch (err) {
            console.error(err);
        } finally {

            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

                <FieldGroup className="space-y-8">

                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category" className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories ? categories.map(cat => (
                                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                    ))
                                        :
                                        <SelectItem value="">No Categories found</SelectItem>
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="tags">Tags</FieldLabel>
                        <Input
                            id="tags"
                            type="text"
                            placeholder="react, nodejs, mongodb"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <FieldDescription>
                            Separate tags using commas
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel>Content</FieldLabel>
                        <BlogEditor content={content} onChange={setContent} />
                    </Field>

                    <Field>
                        <FieldLabel>Picture</FieldLabel>
                        <Input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="h-10 cursor-pointer
                         file:px-4
                         file:rounded-md file:border-0
                         file:bg-primary file:text-primary-foreground
                         file:font-medium"
                        />
                    </Field>

                </FieldGroup>

                <div className="pt-4 flex justify-end">
                    <Button size="lg" className={`px-8 ${isLoading ? "cursor-not-allowed bg-gray-500" : ""}`} onClick={handleSubmit}>
                        {isLoading ? "Publishing..." : "Publish"}
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default CreatePost
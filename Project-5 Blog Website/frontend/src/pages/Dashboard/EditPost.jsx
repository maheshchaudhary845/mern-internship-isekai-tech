import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import BlogEditor from "@/components/editor/BlogEditor"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useParams } from "react-router"
import { useNavigate } from "react-router";
import authFetch from "@/utils/authFetch";

function EditPost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState("")
    const [image, setImage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState("");
    const [postId, setPostId] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${slug}`);
            const { data, success } = await res.json();

            if (success) {
                setTitle(data.title);
                setContent(data.content);
                setCategory(data.category._id);
                setTags(data.tags.map(t => t.name).join(", "));
                setImage(data.image);
                setPreviewImage(`${import.meta.env.VITE_API_URL}${data.image}`);
                setPostId(data._id);
            }
        }
        fetchPost();
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
            const { data } = await res.json()
            setCategories(data)
        }
        fetchCategories()
    }, [])

    const handleUpdate = async () => {
        if (!title || !content || !category) {
            alert("Title, Content and Category are required")
            return
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)
        formData.append("category", category)
        formData.append("tags", JSON.stringify(tags.split(",").map(t => t.trim())))

        if (image instanceof File) {
            formData.append("image", image)
        }
        try {
            setIsLoading(true)
            const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
                method: "PUT",
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
            setPreviewImage("");

            navigate('/dashboard');

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
                            name="title"
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
                                    {categories.map(cat => (
                                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                    ))}
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
                        {previewImage && (
                            <img src={previewImage} alt="Preview" className="w-full max-w-sm max-h-75 object-contain" />
                        )}
                        <Input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setImage(file);
                                setPreviewImage(URL.createObjectURL(file));
                            }}
                            className="h-10 cursor-pointer
                         file:px-4
                         file:rounded-md file:border-0
                         file:bg-primary file:text-primary-foreground
                         file:font-medium"
                        />
                    </Field>

                </FieldGroup>

                <div className="pt-4 flex justify-end">
                    <Button size="lg" className={`px-8 cursor-pointer ${isLoading ? "cursor-not-allowed bg-gray-500" : ""}`} onClick={handleUpdate}>
                        {isLoading ? "Updating..." : "Update Post"}
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default EditPost;
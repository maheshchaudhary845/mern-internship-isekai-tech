import { useEffect, useState } from "react";
import Post from "../components/Post";
import { Link } from "react-router";
import Loading from "@/components/Loading";

function Home() {
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState({
        sort: "",
        category: "",
        tags: [],
        from: "",
        to: ""
    });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const query = buildQuery();
            console.log(query)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?${query}`);
            const { success, data, message } = await res.json();
            if (success) {
                setPosts(data);
                setError("");
            } else {
                setError(message)
            }
            setLoading(false);
        }
        fetchPosts();
    }, [filters])

    useEffect(() => {
        async function fetchFilters() {
            try {
                const [catRes, tagRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/categories`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/tags`)
                ])
                const catData = await catRes.json();
                const tagData = await tagRes.json();

                setCategories(catData.data);
                setTags(tagData.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchFilters();
    }, [])

    function buildQuery() {
        const params = new URLSearchParams();

        if (filters.sort) params.append("sort", filters.sort);
        if (filters.category) params.append("category", filters.category);
        if (filters.tags.length) params.append("tags", filters.tags.join(","));
        if (filters.from) params.append("from", filters.from);
        if (filters.to) params.append("to", filters.to);

        return params.toString();
    }

    // if (loading) {
    //     return (
    //         <Loading />
    //     )
    // }
    return (
        <>
            {loading && <Loading />}
            <div className="px-2">
                <h2>All Posts</h2>
                <div className="flex flex-wrap gap-3 mt-4 items-center">
                    <select value={filters.sort} onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))} className="bg-gray-600 rounded-sm p-2">
                        <option value="latest">Latest</option>
                        <option value="popular">Popular</option>
                    </select>
                    <select value={filters.category} onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))} className="bg-gray-600 rounded-sm p-2">
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category._id} value={category.slug}>{category.name}</option>
                        ))}
                    </select>
                    <input type="date" onChange={(e) => setFilters(prev => ({ ...prev, from: e.target.value }))} className="bg-gray-700 px-3 py-2 rounded-md" />
                    <input type="date" onChange={(e) => setFilters(prev => ({ ...prev, to: e.target.value }))} className="bg-gray-700 px-3 py-2 rounded-md" />
                </div>
                <div className="relative ball overflow-hidden">
                    <div className="flex my-scroll-container overflow-x-auto gap-2 my-3">
                        {tags.map(tag => (
                            <button key={tag._id}
                                onClick={() => {
                                    setFilters(prev => ({
                                        ...prev,
                                        tags: prev.tags.includes(tag.slug) ? prev.tags.filter(t => t !== tag.slug) : [...prev.tags, tag.slug]
                                    }))
                                }}
                                className={`px-3 py-0 rounded-full text-sm border cursor-pointer ${filters.tags.includes(tag.slug) ? "bg-gray-600 border-gray-600" : "bg-sky-600 border-sky-600"}`}>#{tag.name}</button>
                        ))}
                    </div>
                </div>

                {error ? <p className="text-center">{error}</p> :
                    <div className="posts">
                        {posts.map(post => (
                            <Link to={`/post/${post.slug}`} key={post.id}>
                                <Post post={post} />
                            </Link>
                        ))}
                    </div>
                }
            </div>
        </>
    )
};

export default Home;
import { useContext, useEffect, useState } from "react";
import DashPost from "../../components/DashPost";
import { Link } from "react-router";
import { AuthContext } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import authFetch from "@/utils/authFetch";

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ sort: "latest", search: "", category: "", tags: [], from: "", to: "" });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (!auth) return;
        if (!filters.search) {
            setLoading(true);
        }
        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                const query = buildQuery();
                const res = await authFetch(`${import.meta.env.VITE_API_URL}/api/posts/user/${auth?.id}?${query}`);
                const { data, success, message } = await res.json();

                if (success) {
                    setPosts(data);
                }
                else {
                    setPosts("");
                    console.error(message);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 500)

        return () => clearTimeout(timer);

    }, [auth, filters])

    useEffect(() => {
        async function fetchFilters() {
            try {
                const [catRes, tagRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/categories`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/tags`)
                ]);
                const [catData, tagData] = await Promise.all([
                    catRes.json(),
                    tagRes.json()
                ])

                if (catData.success) {
                    setCategories(catData.data);
                }
                if (tagData.success) {
                    setTags(tagData.data);
                }

            } catch (err) {
                console.error(err);
            }
        }
        fetchFilters();
    }, [])

    function buildQuery() {
        const params = new URLSearchParams();

        if (filters.sort) params.append("sort", filters.sort);
        if (filters.search) params.append("search", filters.search);
        if (filters.category) params.append("category", filters.category);
        if (filters.tags.length) params.append("tags", filters.tags.join(","));
        if (filters.from) params.append("from", filters.from);
        if (filters.to) params.append("to", filters.to);

        return params.toString();
    }

    return (
        <>
            {loading && <Loading />}
            <div className="mx-2">
                <div className="head flex justify-between items-center">
                    <h1 className="text-lg">Dashboard</h1>
                    <Link to={'/createpost'}><button className="bg-green-500 px-2 py-1 rounded-sm cursor-pointer hover:bg-green-600">Create Post +</button></Link>
                </div>
                <div className="flex justify-center mt-4">
                    <input className="bg-neutral-800 p-2 rounded-full max-w-sm w-full" value={filters.search} onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))} type="search" name="search" placeholder="Search Post" />
                </div>

                <div className="max-w-6xl w-full m-auto">
                    <div className="left">
                        <div className="title-bar">
                            <h3 className="text-center my-2">All Posts</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <select value={filters.sort} onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))} className="px-2 py-1 bg-gray-600 rounded-sm">
                                    <option value="latest">Latest</option>
                                    <option value="popular">Popular</option>
                                </select>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                    className="px-2 py-1 bg-gray-600 rounded-sm"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category.slug}>{category.name}</option>
                                    ))}
                                </select>
                                <input type="date" className="px-2 py-1 bg-gray-600 rounded-sm" value={filters.from} onChange={(e) => setFilters(prev => ({ ...prev, from: e.target.value }))} />
                                <input type="date" className="px-2 py-1 bg-gray-600 rounded-sm" value={filters.to} onChange={(e) => setFilters(prev => ({ ...prev, to: e.target.value }))} />
                            </div>

                            <div className="relative ball overflow-hidden">
                                <div className="flex my-scroll-container overflow-x-auto gap-2 my-3">
                                    {tags.map(tag => (
                                        <button
                                            key={tag._id}
                                            onClick={() => setFilters(prev => (
                                                {
                                                    ...prev,
                                                    tags: filters.tags.includes(tag.slug) ? filters.tags.filter(t => t !== tag.slug) : [...prev.tags, tag.slug]
                                                }
                                            ))}
                                            className={`px-3 py-2 rounded-full text-nowrap text-sm border cursor-pointer ${filters.tags.includes(tag.slug) ? "bg-sky-600" : "bg-gray-600"}`}
                                        >#{tag.name}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="dash-posts gap-2">
                            {posts ? posts.map(post => (
                                <Link key={post.id} to={`/post/${post.slug}`}>
                                    <DashPost post={post} setPosts={setPosts} />
                                </Link>
                            )) : <p className="text-gray-400 text-center">No post found</p>}

                        </div>
                    </div>
                    {/* <div className="right"></div> */}
                </div>
            </div>
        </>
    )
}

export default Dashboard;
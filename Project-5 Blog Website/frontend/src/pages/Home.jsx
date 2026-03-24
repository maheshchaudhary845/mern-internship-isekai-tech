import { useEffect, useState } from "react";
import Post from "../components/Post";
import { Link } from "react-router";
import Loading from "@/components/Loading";

function Home() {
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?sort=${sort}`);
            const { success, data, message } = await res.json();
            if (success) {
                setPosts(data);
            } else {
                console.error(message);
            }
            setLoading(false);
        }
        fetchPosts();
    }, [sort])

    if(loading){
        return(
            <Loading />
        )
    }
    return (
        <div className="px-2">
            <div className="flex justify-between items-center">
                <h2>All Posts</h2>
                <select value={sort} onChange={(e)=>setSort(e.target.value)} className="bg-gray-600 rounded-sm p-2">
                    <option value="latest">Latest</option>
                    <option value="popular">Popular</option>
                    <option value="category">Category</option>
                </select>
            </div>
            <div className="posts">
                {posts.map(post => (
                    <Link to={`/post/${post.slug}`} key={post.id}>
                        <Post post={post} />
                    </Link>
                ))}
            </div>
        </div>
    )
};

export default Home;
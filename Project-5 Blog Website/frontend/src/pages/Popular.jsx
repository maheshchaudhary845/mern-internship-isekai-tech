import Loading from "@/components/Loading";
import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Popular() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?sort=popular`);
                const { success, data, message } = await res.json();
                if (success) {
                    setPosts(data);
                } else {
                    setError(message)
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [])

    if (loading) return <Loading />

    return (
        <>
            {error && <p className="text-center text-gray-300">{error}</p>}
            <div className="posts mx-2! ">
                {posts.map(post => (
                    <Link key={post._id} to={`/post/${post.slug}`}>
                        <Post post={post} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Popular;
import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Popular() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?sort=popular`);
                const { success, data } = await res.json();
                if (success) {
                    setPosts(data);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchPosts();
    }, [])
    return (
        <>
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
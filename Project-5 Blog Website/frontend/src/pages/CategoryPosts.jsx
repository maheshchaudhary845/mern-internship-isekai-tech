import Loading from "@/components/Loading";
import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function CategoryPosts() {
    const { slug } = useParams();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPostsByCategory() {
            try {
                setLoading(true);
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?category=${slug}`);
                const { data, success, message } = await res.json();
                if (!success) {
                    return setError(message);
                }
                setPosts(data);
                setError("");
            } catch (err) {
                console.error(err)
            } finally{
                setLoading(false);
            }
        }
        fetchPostsByCategory();
    }, [slug])
    if (error) {
        return <p className="text-center text-gray-400">{error}</p>
    } else if(loading){
        return <Loading />
    }
    return (
        <>
            <div className="posts mx-2!">
                {posts?.map(post => (
                    <Link key={post._id} to={`/post/${post.slug}`}>
                        <Post post={post} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default CategoryPosts;
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { Link } from "react-router";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch("http://localhost:3000/api/posts");
            const { success, data, message } = await res.json();
            if (success) {
                setPosts(data);
            } else {
                console.error(message);
            }
        }
        fetchPosts();
    }, [])
    return (
        <>
            
            <h2>Recent Posts</h2>
            <div className="posts">
                {posts.map(post => (
                <Link to={`/post/${post.slug}`} key={post.id}>
                    <Post  post={post} />
                </Link>
                ))}
            </div>
        </>
    )
};

export default Home;
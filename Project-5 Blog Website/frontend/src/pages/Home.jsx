import { useEffect, useState } from "react";
import Post from "../components/Post";
import { Link } from "react-router";

function Home() {
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("");

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`http://localhost:3000/api/posts?sort=${sort}`);
            const { success, data, message } = await res.json();
            if (success) {
                setPosts(data);
            } else {
                console.error(message);
            }
        }
        fetchPosts();
    }, [sort])
    console.log(sort)
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
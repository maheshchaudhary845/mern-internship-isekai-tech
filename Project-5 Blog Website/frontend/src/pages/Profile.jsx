import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Post from "@/components/Post";
import { Link } from "react-router";

function Profile() {
    const { auth } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState("");

    useEffect(() => {
        async function fetchPosts() {
            if (!auth) return;

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/user/${auth.id}`, {
                    credentials: "include"
                });
                const { data, success, message, total } = await res.json();

                if (success) {
                    setPosts(data);
                    setTotalPosts(total);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchPosts();
    }, [auth])

    if (!auth) {
        return <p className="text-center">Loading...</p>
    }

    return (
        <>
            <div className="flex flex-col gap-3 items-center max-w-6xl m-auto">
                <div className="img-container rounded-full w-50 h-50 overflow-hidden">
                    <img className="object-cover w-full h-full" src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png" alt="profile pic" />
                </div>
                <h4 className="text-xl">{auth?.fullName}</h4>
                <p className="text-lg">{totalPosts}<span className="text-gray-400"> posts</span></p>
            </div>

            <div className="posts mt-10!">
                {posts.map(post => (
                    <Link key={post.id} to={`/post/${post.slug}`}>
                        <Post post={post} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Profile;
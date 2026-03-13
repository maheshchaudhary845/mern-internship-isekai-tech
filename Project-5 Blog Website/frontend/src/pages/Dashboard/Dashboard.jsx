import { useContext, useEffect, useState } from "react";
import DashPost from "../../components/DashPost";
import { Link } from "react-router";
import { AuthContext } from "@/context/AuthContext";

function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (!auth) return;

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/user/${auth?.id}?search=${search}`);
                const { data, success, message } = await res.json();

                if (success) {
                    setPosts(data);
                }
                else {
                    console.error(message);
                }

            } catch (err) {
                console.error(err);
            }
        }, 500)

        return ()=> clearTimeout(timer);

    }, [auth, search])

    return (
        <>
            <div className="head flex justify-between items-center">
                <h1>Dashboard</h1>
                <input className="bg-neutral-800 p-2 rounded-full max-w-sm w-full" value={search} onChange={(e)=>setSearch(e.target.value)} type="search" name="search" placeholder="Search Post" />
                <Link to={'/createpost'}><button className="bg-green-500 px-2 py-1 rounded-sm cursor-pointer hover:bg-green-600">Create Post +</button></Link>
            </div>

            <div className="dash-cont">
                <div className="left">
                    <div className="title-bar">
                        <h3>All Posts</h3>
                    </div>
                    <div className="dash-posts">
                        {posts.map(post => (
                            <DashPost key={post.id} post={post} setPosts={setPosts} />
                        ))}

                    </div>
                </div>
                <div className="right"></div>
            </div>
        </>
    )
}

export default Dashboard;
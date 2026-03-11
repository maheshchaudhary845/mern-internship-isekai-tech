import { useEffect, useState } from "react";
import DashPost from "../../components/DashPost";
import { Link } from "react-router";

function Dashboard() {
    const [activePosts, setActivePosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch("http://localhost:3000/api/posts");
            const { success, data, message } = await res.json();
            if (success) {
                setActivePosts(data);
            } else {
                console.error(message);
            }
        }
        fetchPosts();
    }, [])
    return (
        <>
            <div className="head flex justify-between">
                <h1>Dashboard</h1>
                <Link to={'/createpost'}><button className="bg-green-500 px-2 py-1 rounded-sm cursor-pointer hover:bg-green-600">Create Post +</button></Link>
            </div>

            <div className="dash-cont">
                <div className="left">
                    <div className="title-bar">
                        <h3>All Posts</h3>
                    </div>
                    <div className="dash-posts">
                        {activePosts.map(post => (
                            <DashPost key={post.id} post={post} />
                        ))}

                    </div>
                </div>
                <div className="right"></div>
            </div>
        </>
    )
}

export default Dashboard;
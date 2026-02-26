import { useEffect, useState } from "react";
import DashPost from "../../components/DashPost";

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
            <h1>Dashboard</h1>

            <div className="dash-cont">
                <div className="left">
                    <div className="title-bar">
                        <h3>Popular Posts</h3>
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
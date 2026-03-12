import { useContext, useEffect, useState } from "react";
import DashPost from "../../components/DashPost";
import { Link } from "react-router";
import { AuthContext } from "@/context/AuthContext";

function Dashboard() {
    const [activePosts, setActivePosts] = useState([]);
    const {auth} = useContext(AuthContext);
    
    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/user/${auth?.id}`);
            const { success, data, message } = await res.json();
            if (success) {
                setActivePosts(data);
            } else {
                console.error(message);
            }
        }
        if(auth){
            fetchPosts();
        }
        }, [auth])
    return (
        <>
            <div className="head flex justify-between items-center">
                <h1>Dashboard</h1>
                <input className="bg-neutral-800 p-2 rounded-full max-w-sm w-full" type="search" name="search" id="" placeholder="Search Post" />
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
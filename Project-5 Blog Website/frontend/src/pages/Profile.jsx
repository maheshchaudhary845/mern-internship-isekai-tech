import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Post from "@/components/Post";
import { Link } from "react-router";

function Profile() {
    const { auth } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState("");
    const [showModal, setShowModal] = useState(false);

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
            {showModal && <div className="absolute inset-0 bg-black/70 z-10 flex justify-center">
                <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-xs p-4 rounded-md max-w-lg w-full h-fit mt-20">
                    <button onClick={()=>setShowModal(false)} className="self-end cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" />
                        </svg>
                    </button>
                </div>
            </div>}
            <div className="flex flex-col gap-3 items-center max-w-6xl m-auto relative w-fit">
                <div className="img-container rounded-full w-50 h-50 overflow-hidden">
                    <img className="object-cover w-full h-full" src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png" alt="profile pic" />
                </div>
                <button onClick={() => setShowModal(true)} className="edit absolute right-0 top-0 cursor-pointer" title="Edit Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round">
                        <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" />
                        <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" />
                    </svg>
                </button>
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
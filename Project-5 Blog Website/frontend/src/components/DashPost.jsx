import { useEffect, useState } from "react";
import { Link } from "react-router";

function DashPost({ post, setPosts }) {
    const [commentCount, setCommentCount] = useState(0);

    useEffect(()=>{
        async function fetchCommentsCount(){
            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/post/${post._id}`);
                const {success, total} = await res.json();

                if(success){
                    setCommentCount(total);
                }
            }catch(err){
                console.error(err);
            }
        }
        fetchCommentsCount()
    }, [])
    
    async function handleDelete() {
        try {
            const isDelete = confirm("Do you really want to delete this post?");
            if(!isDelete) return;

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post.id}`, {
                method: "DELETE",
                credentials: "include"
            })
            const { data, success, message } = await res.json();
            if(success){
                setPosts((prev)=>{
                    return prev.filter(p=> p.id != data.id);
                })
            }

            alert(message);
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="dash-post hover:scale-[102%] transition-all cursor-pointer">
            <div className="dash-left">
                <div className="dash-img-cont">
                    <img src={`${import.meta.env.VITE_API_URL}${post.image}`} alt="post image" />
                </div>
            </div>
            <div className="dash-title-right">
                <div className="dash-title-right-upper flex justify-between">
                    <div>
                        <h4 className="dash-post-title text-lg font-semibold">{post.title}</h4>
                        <p className="dash-post-date text-gray-400 text-xs font-medium">{new Date(post.createdAt).toLocaleString("en-US", {
                            timeZone: "asia/kolkata",
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        })}</p>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                        <Link to={`/dashboard/editpost/${post.slug}`}><svg className="hover:bg-gray-700 rounded-full p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3.78181 16.3092L3 21L7.69086 20.2182C8.50544 20.0825 9.25725 19.6956 9.84119 19.1116L20.4198 8.53288C21.1934 7.75922 21.1934 6.5049 20.4197 5.73126L18.2687 3.58024C17.495 2.80658 16.2406 2.80659 15.4669 3.58027L4.88841 14.159C4.30447 14.7429 3.91757 15.4947 3.78181 16.3092Z" />
                            <path d="M14 6L18 10" />
                        </svg></Link>
                        <svg onClick={handleDelete} className="hover:bg-gray-700 rounded-full p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#F54927" fill="none" stroke="#F54927" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" />
                            <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" />
                            <path d="M9.5 16.5L9.5 10.5" />
                            <path d="M14.5 16.5L14.5 10.5" />
                        </svg>
                    </div>
                </div>
                <div className="dash-title-right-bottom">
                    <div className="dash-post-interactions">
                        <div className="dash-post-comment">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 13.5H16M8 8.5H12" />
                                <path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" />
                            </svg>
                            <p className="comment-count">{commentCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashPost;
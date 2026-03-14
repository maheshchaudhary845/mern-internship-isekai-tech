import { useEffect, useState } from "react";
import { useParams } from "react-router";

function SinglePost() {
    const { slug } = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${slug}`);
                const { data, success } = await res.json();

                if (success) {
                    setPost(data);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchPost();
    }, [])
    console.log(post)
    return (
        <>
            <div className="max-w-5xl mx-auto">
                <div className="w-full">
                    <img
                        className="w-full h-auto max-h-125 object-cover rounded-lg"
                        src={`${import.meta.env.VITE_API_URL}${post.image}`}
                        alt="thumbnail image of blog"
                    />
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <p className="bg-orange-600 w-fit py-1 px-4 rounded-full text-sm">{post.category?.name}</p>
                    •
                    <p className="text-sm">{new Date(post?.createdAt).toLocaleDateString("en-US",{
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        timeZone: "Asia/Kolkata"
                    })}</p>
                </div>
                <div className="mt-6">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                </div>
                <div className="mt-2">
                    <p className="text-gray-300">By {post.author?.fullName}</p>
                </div>
                <div className="mt-6">
                    <div dangerouslySetInnerHTML={{__html: post?.content}} className=""></div>
                </div>
                <div className="mt-10 mb-3 tags flex gap-2">
                    Tags: 
                    {post?.tags?.map(tag=>(
                        <p key={tag._id} className="tag">#{tag.name}</p>
                    ))}
                </div>
                <hr />
                <div className="my-3">
                    <p>Written By: {post?.author?.fullName}</p>
                </div>
            </div>
        </>
    )
}

export default SinglePost;
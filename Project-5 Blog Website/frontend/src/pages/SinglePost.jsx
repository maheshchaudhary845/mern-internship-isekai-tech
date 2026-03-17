import { useEffect, useState } from "react";
import { useParams } from "react-router";

function SinglePost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

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

    useEffect(() => {
        async function fetchComments() {
            if (!post) return;
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/post/${post._id}`);
                const { success, data } = await res.json();
                if (success) {
                    setComments(data);
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchComments();
    }, [post])

    async function handleComment() {
        if (!comment) return;
        const commentObj = {
            text: comment,
            postId: post._id,
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commentObj),
                credentials: "include"
            })

            const { success, data } = await res.json();
            if (success) {
                setComments((prev)=>([data, ...prev]));
                setComment("");
            }
        } catch (err) {
            console.error(err);
        }
    }
    if (!post) return <p className="text-center">Loading...</p>
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
                    <p className="text-sm">{new Date(post?.createdAt).toLocaleDateString("en-US", {
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
                    <div dangerouslySetInnerHTML={{ __html: post?.content }} className=""></div>
                </div>
                <div className="mt-10 mb-3 tags flex gap-2">
                    Tags:
                    {post?.tags?.map(tag => (
                        <p key={tag._id} className="tag">#{tag.name}</p>
                    ))}
                </div>
                <hr />
                <div className="my-3">
                    <p>Written By: {post?.author?.fullName}</p>
                </div>

                <h4 className="text-2xl mt-10 mb-2">Comments</h4>
                <div className="comments space-y-4 px-2">
                    {comments.length>0 ?
                        comments.map(comment => (
                            <div key={comment._id} className="comment space-y-1">
                                <div className="user flex items-center gap-1">
                                    <div className="img w-7 rounded-full overflow-hidden">
                                        <img className="w-full object-cover" src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Pic-Clip-Art-Background.png" alt="user avatar pic" />
                                    </div>
                                    <p>{comment.user.fullName}</p>
                                </div>
                                <p className="text-gray-300">{comment.text}</p>
                                <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString("en-IN", {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}</p>
                            </div>
                        ))
                        :
                        <p className="text-gray-400">Be the first to comment</p>
                    }
                </div>

                <div className="comment-section flex gap-2 my-2 mt-4">
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Leave your comment..." className="p-2 max-w-full w-full min-h-30 border-2"></textarea>
                    <button onClick={handleComment} className={` p-2 px-4 rounded-sm h-fit ${comment ? "cursor-pointer bg-green-500 hover:bg-green-600" : "cursor-not-allowed bg-gray-500"}`} disabled={!comment && true}>Comment</button>
                </div>
            </div>
        </>
    )
}

export default SinglePost;
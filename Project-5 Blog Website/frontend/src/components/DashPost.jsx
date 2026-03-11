function DashPost({post}) {
    return (
        <div className="dash-post hover:scale-[102%] transition-all cursor-pointer">
            <div className="dash-left">
                <div className="dash-img-cont">
                    <img src={`${import.meta.env.VITE_API_URL}${post.image}`} alt="post image" />
                </div>
            </div>
            <div className="dash-title-right">
                <div className="dash-title-right-upper">

                    <h4 className="dash-post-title text-lg font-semibold">{post.title}</h4>
                    <p className="dash-post-date text-gray-400 text-xs font-medium">{new Date(post.createdAt).toLocaleString("en-US",{
                        timeZone: "asia/kolkata",
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })}</p>
                </div>
                <div className="dash-title-right-bottom">
                    <div className="dash-post-interactions">
                        <div className="dash-post-comment">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 13.5H16M8 8.5H12" />
                                <path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" />
                            </svg>
                            <p className="comment-count">21</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashPost;
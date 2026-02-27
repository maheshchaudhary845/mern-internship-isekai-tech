function Post({post}) {
    return (
        <div className="post">
            <div className="img-cont">
                <img src={`http://localhost:3000${post.image}`} alt="post image" />
            </div>
            <div className="meta-cont">
                <p className="category">{post.category.name}</p>
                <p className="date-time">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
            <div className="content">
                <h3>{post.title}</h3>
                <p className="description"
                dangerouslySetInnerHTML={{__html: post.content}}
                >
                    {/* {post.content} */}
                </p>
            </div>
        </div>
    )
}

export default Post;
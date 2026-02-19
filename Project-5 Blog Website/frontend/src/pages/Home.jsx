function Home() {
    return (
        <>
            <h2>Recent Posts</h2>
            <div className="posts">
                <div className="post">
                    <div className="img-cont">
                        <img src="https://preview.colorlib.com/theme/webmag/img/post-3.avif" alt="" />
                    </div>
                    <div className="meta-cont">
                        <p className="category">JavaScript</p>
                        <p className="date-time">Febuary 19, 2026</p>
                    </div>
                    <div className="content">
                        <h3>Title</h3>
                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum exercitationem iste cum temporibus velit delectus alias, fuga ut atque vitae!
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;
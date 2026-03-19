function About() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold">About Blog Mag</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Blog Mag is a modern blogging platform where developers and creators share ideas,
                    tutorials, and knowledge with the world.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">

                <div className="w-full">
                    <img
                        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                        alt="about"
                        className="rounded-xl w-full h-full object-cover"
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Our Mission</h2>
                    <p className="text-gray-300">
                        Our goal is to provide a platform where developers can learn,
                        grow, and share their knowledge. Whether you are a beginner or an expert,
                        Blog Mag helps you stay updated with modern technologies.
                    </p>

                    <h2 className="text-2xl font-semibold">What You Can Do</h2>
                    <ul className="flex flex-col items-start text-gray-300 space-y-2">
                        <li>Create and publish blog posts</li>
                        <li>Explore trending and popular topics</li>
                        <li>Engage with community through comments</li>
                        <li>Learn new technologies easily</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold">100+</h3>
                    <p className="text-gray-400">Posts</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold">50+</h3>
                    <p className="text-gray-400">Authors</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold">10K+</h3>
                    <p className="text-gray-400">Views</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold">500+</h3>
                    <p className="text-gray-400">Comments</p>
                </div>
            </div>

        </div>
    );
}

export default About;
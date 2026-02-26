const Post = require("../models/Post");
const Tag = require("../models/Tag");
const slugify = require("slugify");

module.exports = {
    async getPosts(req, res) {
        try {
            const posts = await Post.find().populate('author').populate('category').populate("tags");

            res.json({
                success: true,
                data: posts,
                message: "Posts fetched successfully"
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },

    async createPost(req, res) {
        try {
            const imagePath = req.file
                ? `/uploads/posts/${req.file.filename}`
                : null;

            let { title, content, category, tags } = req.body;
            const author = req.user.id;

            let slug = slugify(title, {
                lower: true,
                strict: true
            });

            let existingPost = await Post.findOne({ slug });
            let counter = 1;

            while (existingPost) {
                slug = `${slug}-${counter}`;
                existingPost = await Post.findOne({ slug });
                counter++;
            }

            if (typeof tags === "string") {
                tags = JSON.parse(tags);
            }

            let tagIds = [];
            if (tags && tags.length > 0) {
                tagIds = await Promise.all(
                    tags.map(async (name) => {
                        name = name.trim().toLowerCase();

                        const tagSlug = slugify(name, {
                            lower: true,
                            strict: true
                        });

                        let tag = await Tag.findOne({ slug: tagSlug });

                        if (!tag) {
                            tag = await Tag.create({
                                name,
                                slug: tagSlug
                            });
                        }

                        return tag._id;
                    })
                );
            }

            const post = await Post.create({
                title,
                slug,
                content,
                author,
                category,
                tags: tagIds,
                image: imagePath
            });

            res.status(201).json({
                success: true,
                data: post,
                message: "Post uploaded"
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    async getPostBySlug(req, res) {
        try {
            const post = await Post.findById(req.params.id).populate("author").populate('category');

            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found"
                })
            }

            res.json({
                success: true,
                data: post,
                message: "Post fetched successfully!"
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async updatePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found"
                })
            }

            const allowedFields = ["title", "content"];
            allowedFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    post[field] = req.body[field];
                }
            })
            await post.save();

            res.json({
                success: true,
                data: post,
                message: "Post updated!"
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async deletePost(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found"
                })
            }

            res.json({
                success: true,
                data: post,
                message: "Post deleted successfully"
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}
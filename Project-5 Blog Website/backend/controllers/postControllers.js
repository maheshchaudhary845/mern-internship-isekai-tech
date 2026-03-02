const Post = require("../models/Post");
const Tag = require("../models/Tag");
const slugify = require("slugify");
const sanitizeHtml = require("sanitize-html")

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

            let { title, content, author, category, tags } = req.body;
            // const author = req.user.id;
            // Sanitize HTML content
            content = sanitizeHtml(content, {
                allowedTags: [
                    "p", "b", "i", "em", "strong", "a",
                    "h1", "h2", "h3",
                    "ul", "ol", "li",
                    "blockquote",
                    "code",
                    "img"
                ],
                allowedAttributes: {
                    a: ["href", "target", "rel"],
                    img: ["src", "alt"]
                },
                allowedSchemes: ["http", "https", "mailto"],
            })

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

            // if (typeof content === "string") {
            //     content = JSON.parse(content);
            // }

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
            const post = await Post.findOne({slug: req.params.slug}).populate("author").populate('category').populate('tags');
            // const post = await Post.aggregate(
            //    [ {
            //         $match:{
            //             slug: req.params.slug
            //         } 
            //     },
            
            //     {
            //          $lookup:{
            //             from:'users',
            //             localField:'author',
            //             foreignField:'_id',
            //             as:'author'
            //         }
            //     },


            //     {
            //          $lookup:{
            //             from:'categories',
            //             localField:'category',
            //             foreignField:'_id',
            //             as:'category'
            //         }
            //     },
            //     {
            //          $lookup:{
            //             from:'tags',
            //             localField:'tags',
            //             foreignField:'_id',
            //             as:'tags'
            //         }
            //     },
            //     {
            //         $limit:1
            //     },
            // {
            //          $project:{
            //            author:{
            //             password:0
            //            }
            //         }
            //     }
            // ]
            // )


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
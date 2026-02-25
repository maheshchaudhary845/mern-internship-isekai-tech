const Post = require("../models/Post");
const Tag = require("../models/Tag");


module.exports = {
    async getPosts(req, res){
        try{
            const posts = await Post.find().populate('author').populate('category');

            res.json({
                success: true,
                data: posts,
                message: "Posts fetched successfully"
            })
        } catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },

    async createPost(req, res){
        try{
            const imagePath = req.file ? `/uploads/posts/${req.file.filename}` : null;

            let {title, content, author, category, tags} = req.body;

            if(typeof(tags) === "string"){
                tags = JSON.parse(tags);
            }

            let tagIds = [];
            if(tags && tags.length>0){
                for(let name of tags){
                    name = name.trim().toLowerCase();

                    const slug = name.replace(/\s+/g, "-");

                    let tag = await Tag.findOne({slug});
                    if(!tag){
                        tag = await Tag.create({name, slug});
                    }
                    tagIds.push(tag._id);
                }
            }

            const post = await Post.create({
                title,
                content,
                author,
                category,
                tags: tagIds,
                image: imagePath
            });

            res.status(201).json({
                success: true,
                message: "Post uploaded"
            });
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async getPostById(req, res){
        try{
            const post = await Post.findById(req.params.id).populate("author").populate('category');

            if(!post){
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
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async updatePost(req, res){
        try{
            const post = await Post.findById(req.params.id);
            if(!post){
                return res.status(404).json({
                    success: false,
                    message: "Post not found"
                })
            }

            const allowedFields = ["title", "content"];
            allowedFields.forEach(field=>{
                if(req.body[field] !== undefined){
                    post[field] = req.body[field];
                }
            })
            await post.save();

            res.json({
                success: true,
                data: post,
                message: "Post updated!"
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async deletePost(req, res){
        try{
            const post = await Post.findByIdAndDelete(req.params.id);
            if(!post){
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
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}
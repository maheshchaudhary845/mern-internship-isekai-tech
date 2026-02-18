const Post = require("../models/Post")


module.exports = {
    async getPosts(req, res){
        try{
            const posts = await Post.find().populate('author');

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
            const post = await Post.create(req.body)

            res.json({
                success: true,
                message: "Post uploaded"
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async getPostById(req, res){
        try{
            const post = await Post.findById(req.params.id).populate("author");

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
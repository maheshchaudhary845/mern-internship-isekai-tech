const Comment = require('../models/Comment');

exports.addComment = async(req, res)=>{
    try{
        const comment = await Comment.create({
            text: req.body.text,
            post: req.body.postId,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Comment Posted"
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteComment = async(req, res)=>{
    try{
        let comment = await Comment.findById(req.params.id);
        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }
        if(comment.user.toString() != req.user.id && req.user.role !== "admin"){
            return res.status(403).json({
                success: false,
                message: "Not allowed to delete"
            })
        }

        await comment.deleteOne();
        res.json({
            success: true,
            message: "Comment deleted"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getCommentsByPost = async(req, res)=>{
    try{
            const comments = await Comment.find({post: req.params.id}).populate("user", "firstName lastName");
        res.json({
            success: true,
            data: comments,
            message: "Comments by post fetched successfully"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
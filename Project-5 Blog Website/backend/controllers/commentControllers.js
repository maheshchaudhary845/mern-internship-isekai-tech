const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
    try {
        let comment = await Comment.create({
            text: req.body.text,
            post: req.body.postId,
            user: req.user.id
        });

        comment = await comment.populate("user", "firstName lastName fullName");

        res.status(201).json({
            success: true,
            data: comment,
            message: "Comment Posted"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }
        if (comment.user.toString() != req.user.id && req.user.role !== "admin") {
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
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getCommentsByPost = async (req, res) => {
    try {
        let {page=1, limit = 10} = req.query
        const comments = await Comment.find({ post: req.params.id })
        .sort({createdAt: -1})
        .skip((page-1) * limit)
        .limit(Number(limit))
        .populate("user", "firstName lastName fullName");
        res.json({
            success: true,
            data: comments,
            message: "Comments by post fetched successfully"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const Post = require('../models/Post');
const Tag = require('../models/Tag');
const slugify = require('slugify');

exports.getAllTags = async(req, res)=>{
    try{
        const tags = await Tag.find().sort({name: 1});
        res.json({
            success: true,
            data: tags,
            message: "Tags fetched successfully"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getPostsByTag = async(req, res)=>{
    try{
        const {slug} = req.params;
        const tag = await Tag.findOne({slug});
        if(!tag){
            return res.status(404).json({
                success: false,
                message: "Tag not found"
            })
        }
        const posts = await Post.find({tags: tag._id})
        .populate("author")
        .populate("category", "name")
        .sort({createdAt: -1});

        res.json({
            success: true,
            tag: tag.name,
            data: posts,
            total: posts.length,
            message: "Posts fetched by tag successfully"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.createTag = async (req, res) => {
    try {
        let { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Tag name required"
            });
        }

        name = name.trim();

        const slug = slugify(name, {
            lower: true,
            strict: true,
            trim: true
        });

        const exists = await Tag.findOne({ slug });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Tag already exists"
            });
        }

        const tag = await Tag.create({
            name,
            slug
        });

        res.status(201).json({
            success: true,
            data: tag,
            message: "Tag created successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
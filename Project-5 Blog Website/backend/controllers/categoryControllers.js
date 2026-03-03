const Category = require("../models/Category")
const slugify = require('slugify');

exports.getCategories = async(req, res)=>{
    try{
        const categories = await Category.find();
        if(categories.length < 1){
            return res.status(404).json({
                success: false,
                message: "No category found"
            })
        }
        res.json({
            success: true,
            data: categories,
            message: "Successfully fetched categories"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.createCategory = async (req, res)=>{
    try{
        let {name} = req.body
        if(!name){
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            })
        }
        name = name.trim().toLowerCase();

        const slug = slugify(name, {
            lower: true,
            strict: true,
            trim: true
        })
        const category = await Category.create({name, slug});

        res.json({
            success: true,
            data: category,
            message: "Successfully created category"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
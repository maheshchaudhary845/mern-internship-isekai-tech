const Category = require("../models/Category")


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
        const category = await Category.create(req.body);

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
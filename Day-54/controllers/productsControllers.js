const Product = require('../models/Product');

exports.getProducts = async(req, res)=>{
    try{
        if(req.query.limit && req.query.skip){
            const {limit, skip} = req.query;

            const products = await Product.find().skip(skip).limit(limit);
            
            return res.json({
                success: true,
                products,
                message: "Products by page successfully fetched"
            })
        }

        const products = await Product.find();
        res.json({
            success: true,
            products,
            message: "Products successfully fetched!"
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

exports.addProduct = async(req, res)=>{
    try{
        const product = await Product.create(req.body);

        res.json({
            success: true,
            product,
            message: "Product added successfully"
        })
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
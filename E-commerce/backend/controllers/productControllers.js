const Product = require('../models/Product')

module.exports = {
    async getProducts(_req, res){
        try{
            const products = await Product.find();

            res.json({
                success: true,
                data: products,
                message: "Products fetched Successfully"
            })
        } catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }

    }
}
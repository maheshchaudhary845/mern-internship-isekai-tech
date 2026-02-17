const Product = require('../models/Product')

module.exports = {
    async getProducts(_req, res) {
        try {
            const products = await Product.find();

            res.json({
                success: true,
                data: products,
                message: "Products fetched Successfully"
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async createProduct(req, res) {
        try {
            const product = await Product.create(req.body)

            res.json({
                success: true,
                data: product,
                message: "Product created successfully"
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async updateProduct(req, res) {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )
            if(!product){
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                })
            }

            res.json({
                success: true,
                data: product,
                message: "Product updated successfully"
            })

        } catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    async deleteProduct(req, res){
        try{
            const product = await Product.findByIdAndDelete(req.params.id);

            if(!product){
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                })
            }

            res.json({
                success: true,
                data: product,
                message: "Product deleted successfully"
            })
        } catch(err){
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}
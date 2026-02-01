const productsModel = require('../models/productsModel')

exports.getProducts = async(req, res)=>{
    let data = await productsModel.getAllProducts();
    res.json(data);
}

exports.createProduct = async(req, res)=>{
    let data = await productsModel.addProduct(req.body);
    res.json(data);
}
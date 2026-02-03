const productsModel = require('../models/productsModel')

exports.getProducts = async(req, res)=>{
    let data = await productsModel.getAllProducts();
    res.json(data);
}

exports.createProduct = async(req, res)=>{
    let data = await productsModel.addProduct(req.body);
    res.json(data);
}

exports.getProduct = async(req, res)=>{
    let data = await productsModel.getProduct(req.params);
    res.json(data);
}

exports.updateProduct = async(req, res)=>{
    let data = await productsModel.updateProduct(req.params, req.body);
    res.json(data);
}

exports.deleteProduct = async(req, res)=>{
    let data = await productsModel.deleteProduct(req.params);
    res.json(data);
}
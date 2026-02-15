const productsModel = require('../models/productsModel')

exports.getProducts = async (req, res) => {
    let data = await productsModel.getAllProducts();
    
    if(req.query.search){
        console.log(req.query.search);
        const searchedQuery = req.query.search.toLowerCase();
        let searchedProducts = data.products.filter(product => product.title.toLowerCase().includes(searchedQuery));
        return res.json({searchedProducts})
    }
    res.json(data);
}

exports.createProduct = async (req, res) => {
    let data = await productsModel.addProduct(req.body, req.user);
    res.json(data);
}

exports.getProduct = async (req, res) => {
    let data = await productsModel.getProduct(req.params);
    res.json(data);
}

exports.updateProduct = async (req, res) => {
    let data = await productsModel.updateProduct(req.params, req.body);
    res.json(data);
}

exports.deleteProduct = async (req, res) => {
    let data = await productsModel.deleteProduct(req.params);
    res.json(data);
}

exports.getSellerProducts = async (req, res) => {
    const data = await productsModel.getSellerProducts(req.user);
    console.log(data);

    if (!data) {
        return res.json({ success: false, message: "No products found" })
    }

    res.json({
        success: true,
        data
    })
}
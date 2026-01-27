const {getProducts} = require('../model/homeModel');
const editProductModel = require('../model/editProductModel');

exports.getEditProductPage = async(req, res)=>{
    const {id} = req.params;
    const products = await getProducts();
    const product = products.find(product=> product.id == id)
    res.render('editproduct', {product})
}

exports.editProduct = async(req, res)=>{
    await editProductModel.edit(req.body, req.params);
    res.redirect('/showproducts')
}
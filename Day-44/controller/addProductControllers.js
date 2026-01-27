const addProductModel = require('../model/addProductModel');

exports.getAddProductPage = (req, res)=>{
    res.render('addproduct');
}

exports.addProduct = async(req, res)=>{
    await addProductModel.addUser(req.body);
    res.redirect('/addproduct');
}
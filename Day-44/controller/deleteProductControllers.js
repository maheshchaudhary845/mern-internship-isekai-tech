const deleteProductModel = require('../model/deleteProductModel')

exports.getDeleteProduct = async(req, res)=>{
    await deleteProductModel.deleteProduct(req.params);
    res.redirect('/showproducts');
}
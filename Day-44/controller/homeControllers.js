const homeModel = require('../model/homeModel')

exports.getHomePage = async(req, res)=>{
    const products = await homeModel.getProducts();
    res.render('index', {products});
};
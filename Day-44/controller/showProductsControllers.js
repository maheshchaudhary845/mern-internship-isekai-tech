const { getProducts } = require('../model/homeModel')

exports.getShowProductsPage = async (req, res) => {
    const products = await getProducts();

    res.render('showproducts', { products })

}
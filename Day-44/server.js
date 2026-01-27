const express = require("express");
const ejs = require('ejs')
const homeRoutes = require('./routes/homeRoutes');
const addProductRoutes = require('./routes/addProductRoutes');
const showProductsRoutes = require('./routes/showProductsRoutes');
const signupRoutes = require('./routes/signupRoutes');
const signinRoutes = require('./routes/signinRoutes');
const editProductRoutes = require('./routes/editProductRoutes');
const deleteProductRoutes = require('./routes/deleteProductRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes);
app.use('/addproduct', addProductRoutes);
app.use('/signup', signupRoutes);
app.use('/signin', signinRoutes);
app.use('/showproducts', showProductsRoutes);
app.use('/editproduct', editProductRoutes)
app.use('/deleteproduct', deleteProductRoutes);
app.use('/admin', adminRoutes);

app.listen(port, ()=>{
    console.log("Server is running on http://localhost:"+port);
})
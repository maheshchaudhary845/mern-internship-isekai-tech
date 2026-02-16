require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(port, ()=>{
	console.log(`Server is running on http://localhost:${port}`)
});